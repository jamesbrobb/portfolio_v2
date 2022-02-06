import {AnalyticsAction} from "./analytics-service";


export interface AnalyticsAdaptor {

  set(key: string, value: any): void;
  track(action: AnalyticsAction): void;
}
