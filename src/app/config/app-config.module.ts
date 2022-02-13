import {APP_INITIALIZER, Inject, NgModule} from "@angular/core";
import {AppConfig} from "./app-config";
import {RouteConfig, ROUTES_CONFIG_KEY, RoutesConfig} from "../route";
import {menuConfigFactory, MenuConfigService} from "./menu/menu-config";
import {CommonModule} from "@angular/common";

import {GithubConfig, githubConfigService} from "./github/github-config";

import {ControlsOptionsMapService} from "../components/controls/controls.provider";
import {OVERLAY_COLORS} from "@jbr/components/common/overlay/color/color-overlay.component";
import {FALLBACK_COLORS} from "@jbr/product/components/media/image/fallback/fallback-image.component";
import {AnalyticsActionsService, GAConfigService} from "@jbr/ng/core";
import {AnalyticsActions, GaAnalyticsConfig} from "@jbr/core/analytics";
import {PAGES_CONFIG_KEY, PagesConfig, PagesConfigMap} from "./page/page-config";



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: ControlsOptionsMapService,
    useValue: {
      OVERLAY_COLORS: Object.values(OVERLAY_COLORS).map(key => ({key, value: key})),
      FALLBACK_COLORS: Object.values(FALLBACK_COLORS).map(key => ({key, value: key})),
      IMAGE_URLS: [
        {"key": "none", "value": "none"},
        {"key": "image-1", "value": "/assets/media-examples/sample.png", "label": "Image 1"},
        {"key": "image-2", "value": "/assets/media-examples/sample_2.png", "label": "Image 2"}
      ]
    }
  }, {
    provide: githubConfigService,
    useFactory: (appConfig: AppConfig) => {
      return appConfig.getValueByKey<GithubConfig>('github-config');
    },
    deps: [AppConfig]
  }, {
    provide: GAConfigService,
    useFactory: (appConfig: AppConfig) => {
      return appConfig.getValueByKey<GaAnalyticsConfig>('ga-analytics');
    },
    deps: [AppConfig]
  }, {
    provide: AnalyticsActionsService,
    useFactory: (appConfig: AppConfig) => {
      return appConfig.getValueByKey<AnalyticsActions>('analytics');
    },
    deps: [AppConfig]
  }, {
    provide: PagesConfig,
    useFactory: (appConfig: AppConfig) => {
      let config = appConfig.getValueByKey<PagesConfigMap>(PAGES_CONFIG_KEY);
      return new PagesConfig(config);
    },
    deps: [AppConfig]
  }, {
    provide: MenuConfigService,
    useFactory: (appConfig: AppConfig) => {
      let config = appConfig.getValueByKey<RouteConfig>(ROUTES_CONFIG_KEY);
      return menuConfigFactory(config);
    },
    deps: [AppConfig]
  }, {
    provide: RoutesConfig,
    useFactory: (appConfig: AppConfig) => {
      let config = appConfig.getValueByKey<RouteConfig>(ROUTES_CONFIG_KEY);
      return new RoutesConfig(config);
    },
    deps: [AppConfig]
  }, {
    provide: APP_INITIALIZER,
    useFactory: (appConfig: AppConfig) => {
      return () => appConfig.load();
    },
    deps: [AppConfig],
    multi: true
  },
    AppConfig
  ]
})
export class AppConfigModule {}
