import {InjectionToken, NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnalyticsAdaptorService} from "../../analytics.module";
import {
  AnalyticsAdaptor,
  GaAnalyticsAdaptor,
  GaAnalyticsConfig
} from "../../../../../core";


export const GAConfigService = new InjectionToken<GaAnalyticsConfig>('GAConfigService');

const GOOGLE_ANALYTICS_ADAPTOR_PROVIDER: Provider = {
  provide: AnalyticsAdaptorService,
  useFactory: (config: GaAnalyticsConfig): AnalyticsAdaptor => {
    return new GaAnalyticsAdaptor((window as any)?.gtag, config);
  },
  deps: [
    GAConfigService
  ]
}



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    GOOGLE_ANALYTICS_ADAPTOR_PROVIDER
  ]
})
export class GoogleAnalyticsModule { }
