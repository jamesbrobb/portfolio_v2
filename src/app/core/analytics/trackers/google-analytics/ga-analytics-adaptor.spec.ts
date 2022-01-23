import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;
import {
  GaAnalyticsAdaptor,
  GAPageOptions,
  GATrackingTypes,
  GTAG_UNDEFINED_WARNING,
  NO_GOOGLE_ANALYTICS_CONFIG_WARNING,
  UNKNOWN_HIT_TYPE_WARNING
} from './ga-analytics-adaptor';
import {GaAnalyticsConfig} from './ga-analytics-config';
import {AnalyticsAction, AnalyticsPageAction, AnalyticsTrackingTypes} from "../../analytics-service";


describe('GaAnalyticsAdaptor', () => {

    var gtag: Spy,
        config: GaAnalyticsConfig,
        adaptor: GaAnalyticsAdaptor,
        consoleSpy: Spy;

    beforeEach(() => {

        config = {
            trackerId: 'fakeId',
            trackerName: 'fakeName',
            cookieDomain: 'domain'
        };

        gtag = createSpy('gtag');

        adaptor = new GaAnalyticsAdaptor(gtag, config);

        consoleSpy = spyOn(console, 'warn').and.stub();
    });

    describe('.track()', () => {

        it('should warn if the supplied gtag function is undefined', () => {

            new GaAnalyticsAdaptor(undefined as any, config);

            expect(consoleSpy).toHaveBeenCalledWith(GTAG_UNDEFINED_WARNING);
        });

        it('should warn if the supplied config is undefined', () => {

            new GaAnalyticsAdaptor(gtag, undefined as any);

            expect(consoleSpy).toHaveBeenCalledWith(NO_GOOGLE_ANALYTICS_CONFIG_WARNING);
        });

        it('should configure gtag', () => {

            expect(gtag).toHaveBeenCalledWith(GATrackingTypes.config, config.trackerId, jasmine.any(Object))
        })

        it('should warn if the supplied trackType does not exist', () => {

            let type: string = 'noSuchHitType';

            adaptor.track({type: 'test', trackType: type})

            expect(consoleSpy).toHaveBeenCalledWith(UNKNOWN_HIT_TYPE_WARNING(type));
        });

        it('should set and send a persistant pageview', () => {

            var action: AnalyticsAction = {
                type: 'test',
                trackType: AnalyticsTrackingTypes.page,
                properties: {
                    page_path: 'test/page',
                    page_title: 'page title',
                    page_location: 'page_location'
                }
            },
            page_view: GAPageOptions = {
                ...action.properties,
                send_to: config.trackerId
            } as GAPageOptions,
            set_page_view = {
                ...action.properties
            };

            adaptor.track(action);

            expect(gtag).toHaveBeenCalledWith(GATrackingTypes.set, set_page_view);
            expect(gtag).toHaveBeenCalledWith(GATrackingTypes.event, GATrackingTypes.page_view, page_view);
        });

        it('should send but not set a non-persistant pageview', () => {

            var action: AnalyticsPageAction = {
                type: 'test',
                trackType: AnalyticsTrackingTypes.page,
                doNotPersist: true,
                properties: {
                    page_path: 'test/page',
                    page_title: 'page title',
                    page_location: 'page_location'
                }
            },
            page_view: GAPageOptions = {
                ...action.properties,
                send_to: config.trackerId
            } as GAPageOptions,
            set_page_view = {
                ...action.properties
            };

            adaptor.track(action);

            expect(gtag).not.toHaveBeenCalledWith(GATrackingTypes.set, set_page_view);
            expect(gtag).toHaveBeenCalledWith(GATrackingTypes.event, GATrackingTypes.page_view, page_view);
        });

        it('should send an event', () => {

            var action: AnalyticsAction = {
                type: 'id',
                trackType: AnalyticsTrackingTypes.event,
                properties: {
                    event_category: 'category',
                    event_label: 'label',
                    value: 1
                }
            };

            adaptor.track(action);

            expect(gtag).toHaveBeenCalledWith(GATrackingTypes.event, action.type, action.properties);
        });

        it('should send a timing', () => {

            const action: AnalyticsAction = {
                type: 'id',
                trackType: AnalyticsTrackingTypes.timing,
                properties: {
                    event_category: 'event_category',
                    name: 'name',
                    value: 1000
                }
            };

            adaptor.track(action);

            expect(gtag).toHaveBeenCalledWith(GATrackingTypes.timing_complete, action.properties);
        });
    })
});
