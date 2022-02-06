import {AnalyticsAdaptor} from '../../analytics-adaptor';
import {AnalyticsAction, AnalyticsPageAction, AnalyticsTrackingTypes} from "../../analytics-service";
import {GaAnalyticsConfig} from './ga-analytics-config';


export const GTAG_UNDEFINED_WARNING = 'the supplied gtag function is undefined';
export const NO_GOOGLE_ANALYTICS_CONFIG_WARNING = 'No google analytics config object supplied';
export const UNKNOWN_HIT_TYPE_WARNING = (trackType: string) => `No hitType of type '${trackType}'`


export enum GATrackingTypes {
    config = 'config',
    set = 'set',
    page_view = 'page_view',
    event = 'event',
    timing_complete = 'timing_complete'
}

export interface GAPageOptions {
    page_title: string,
    page_location: string
    page_path: string;
    send_to: string;
}

export interface GAEventOptions {
    event_category: string;
    event_label?: string;
    value?: number;
}

export interface GATimingOptions {
    event_category: string;
    name: string;
    value: number;
}



export class GaAnalyticsAdaptor implements AnalyticsAdaptor {

    private _gtag: Function | undefined;
    private _config: GaAnalyticsConfig | undefined;


    constructor(gtag: Function, config: GaAnalyticsConfig) {

      if(!gtag) {
        console.warn(GTAG_UNDEFINED_WARNING);
        return;
      }

      if(!config) {
        console.warn(NO_GOOGLE_ANALYTICS_CONFIG_WARNING);
        return;
      }

      this._gtag = gtag;
      this._config = config;

      this._initialiseTracker();
    }

    public set(key: string, value: any): void {

        this._send(GATrackingTypes.set, value)
    }

    public track(action: AnalyticsAction): void {

        switch(action.trackType) {

            case AnalyticsTrackingTypes.page:

                this._trackPage(action);
                return;

            case AnalyticsTrackingTypes.event:

                this._trackEvent(action);
                return;

            case AnalyticsTrackingTypes.timing:

                this._trackTiming(action);
                return;
        }

        console.warn(UNKNOWN_HIT_TYPE_WARNING(action.trackType));
    }

    private _initialiseTracker(): void {

      if(!this._gtag || !this._config) {
        return;
      }

      this._gtag('js', new Date());

      let options: {[key:string]: any} = {
        'send_page_view': false,
        'cookie_domain': this._config.cookieDomain || 'auto'
      }

      if(this._config?.options?.allowLinker && this._config.links) {
        options['linker'] = { domains: this._config.links};
      }

      this._send(GATrackingTypes.config, this._config.trackerId, options);
    }

    /*
      @link https://developers.google.com/analytics/devguides/collection/gtagjs/pages
    */
    private _trackPage(action: AnalyticsPageAction): void {

        if(!action.properties || !this._config) {
          return;
        }

        let fields: GAPageOptions = {
            page_title: action.properties['page_title'] as string,
            page_location: action.properties['page_location'] as string,
            page_path: action.properties[`page_path`] as string,
            send_to: this._config.trackerId
        };

        if(!action.doNotPersist) {
            this._send(GATrackingTypes.set, {
              page_title: fields.page_title,
              page_path:fields.page_path,
              page_location: fields.page_location
            });
        }

        this._send(GATrackingTypes.event, GATrackingTypes.page_view, fields);
    }

    /*
      @link https://developers.google.com/analytics/devguides/collection/gtagjs/events
     */
    private _trackEvent(action: AnalyticsAction): void {

        if(!action.properties) {
          return;
        }

        let fields: GAEventOptions = {
            event_category: action.properties['event_category'] as string,
            event_label: action.properties['event_label'] as string
        };

        if(action.properties?.['value']) {
            fields.value = action.properties?.['value'] as number;
        }

        this._send(GATrackingTypes.event, action.type, fields);
    }

    private _trackTiming(action: AnalyticsAction): void {

        if(!action.properties) {
          return;
        }

        var fields: GATimingOptions = {
            event_category: action.properties['event_category'] as string,
            name: action.properties['name'] as string,
            value: action.properties['value'] as number
        };

        this._send(GATrackingTypes.timing_complete, fields);
    }

    private _send(actionType: string, ...args: unknown[]): void {

        if(!this._gtag) {
          return;
        }

        this._gtag(actionType, ...args);
    }
}
