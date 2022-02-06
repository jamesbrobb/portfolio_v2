import Spy = jasmine.Spy;

import {
  AnalyticsService,
  AnalyticsActions,
  AnalyticsAction,
  AnalyticsEvent,
  INTERPOLATABLE_PROP_VALUES_BUT_EMPTY_PROP_MAP_ERROR
} from './analytics-service';

import {ObjectUtils} from "../utils";
import {MISSING_OBJECT_PROP_ERROR_MESSAGE} from "../utils/object-utils";
import {AnalyticsAdaptor} from './analytics-adaptor';
import {AnalyticsHook} from "./analytics-hook";
import {CommandGroup, CommandProcessor} from "../commands";


describe('AnalyticsService', () => {

    let service: AnalyticsService,
        adaptor: AnalyticsAdaptor,
        actions: AnalyticsActions,
        spy: Spy;

    beforeEach(() => {

      actions = {
            something: {
                to: {
                    track: {

                    }
                }
            },
            another: {
                thing: {
                    to: {
                        track: {
                            type: 'actionType',
                            trackType: 'trackType',
                            properties: {
                              label: '{%obj.value%}'
                            }
                        }
                    }
                }
            }
        };

        adaptor = {
            set: (key: string, value: any): void => {

            },
            track: (options: any): void => {

            }
        };

        service = new AnalyticsService(actions, adaptor);
    });

    describe('.track()', () => {

        let consoleSpy: Spy;

        beforeEach(() => {
            spy = spyOn(adaptor, 'track').and.callThrough();
            consoleSpy = spyOn(console, 'warn').and.stub();
        });

        it('should throw an error if the supplied action id does not exist on the supplied actions', () => {

            let action = {
                actionId: 'something.that.does.not.exist'
            }

            service.track(action);

            expect(consoleSpy).toHaveBeenCalledWith(MISSING_OBJECT_PROP_ERROR_MESSAGE(action.actionId, 'that'))
        });

        it('should throw an error if there are interpolatable property values but an empty prop map is supplied', () => {

            let action = {
                actionId: 'another.thing.to.track'
            };

            service.track(action);

            expect(consoleSpy).toHaveBeenCalledWith(INTERPOLATABLE_PROP_VALUES_BUT_EMPTY_PROP_MAP_ERROR)
        });

        it('should throw an error if an interpolatable property value is missing a corresponding prop map value', () => {

            let action = {
                actionId: 'another.thing.to.track',
                propertyValueMap: {
                  notTheCorrectPropertyKey: 'test'
                }
            }

            service.track(action);

            expect(consoleSpy).toHaveBeenCalledWith(MISSING_OBJECT_PROP_ERROR_MESSAGE('obj.value', 'obj'));
        });

        it('should find the metrics by dot notation property look up', () => {

            service.track({actionId: 'something.to.track'});

            expect(spy).toHaveBeenCalledWith((actions.something as any).to.track);
        });

        it('should interpolate the tracking metric values with the supllied args and forward to adaptor', () => {

            const obj = {
                value: 'test'
            };

            service.track({
                actionId: 'another.thing.to.track',
                propertyValueMap: {
                    obj: obj
                }
            });

            const actn = ObjectUtils.deepMerge([{}, (actions.another as any).thing.to.track])
            actn.properties.label = obj.value;

            expect(spy).toHaveBeenCalledWith(actn);
        });

        it('should execute any supplied prehooks', () => {

            const event: AnalyticsEvent = {
              actionId: 'another.thing.to.track',
              propertyValueMap: {
                obj: {
                    value: 'test'
                }
              }
            }

            const hook: AnalyticsHook = {
                execute(action: AnalyticsAction, actions: AnalyticsActions, adaptor: AnalyticsAdaptor): AnalyticsAction {
                    return action;
                }
            }

            const hookGroup = new CommandGroup<AnalyticsHook>(),
                srv = new AnalyticsService(actions, adaptor, hookGroup, new CommandProcessor());

            const hookSpy: Spy = spyOn(hook, 'execute').and.callThrough();

            hookGroup.addCommand(hook);

            srv.track(event);

            expect(hookSpy).toHaveBeenCalled();
        });
    });
});
