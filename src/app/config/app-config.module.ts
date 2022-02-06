import {APP_INITIALIZER, NgModule} from "@angular/core";
import {AppConfig} from "./app-config";
import {RouteConfig, ROUTES_CONFIG_KEY, RoutesConfig} from "../route/config/route-config";
import {menuConfigFactory, MenuConfigService} from "./menu/menu-config";
import {CommonModule} from "@angular/common";
import {AnalyticsActionsService, GAConfigService} from "../libs/ng/core";
import {githubConfigService} from "./github/github-config";



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: githubConfigService,
    useFactory: (appConfig: AppConfig) => {
      return appConfig.getValueByKey<RouteConfig[]>('github-config');
    },
    deps: [AppConfig]
  }, {
    provide: GAConfigService,
    useFactory: (appConfig: AppConfig) => {
      return appConfig.getValueByKey<RouteConfig[]>('ga-analytics');
    },
    deps: [AppConfig]
  }, {
    provide: AnalyticsActionsService,
    useFactory: (appConfig: AppConfig) => {
      return appConfig.getValueByKey<RouteConfig[]>('analytics');
    },
    deps: [AppConfig]
  }, {
    provide: MenuConfigService,
    useFactory: (appConfig: AppConfig) => {
      let config = appConfig.getValueByKey<RouteConfig[]>(ROUTES_CONFIG_KEY);
      return menuConfigFactory(config);
    },
    deps: [AppConfig]
  }, {
    provide: RoutesConfig,
    useFactory: (appConfig: AppConfig) => {
      let config = appConfig.getValueByKey<RouteConfig[]>(ROUTES_CONFIG_KEY);
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
