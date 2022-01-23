import {InjectionToken, NgModule, Optional, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AnalyticsActions,
  AnalyticsService,
  AnalyticsAdaptor,
  AnalyticsHook
} from "../../../core";
import {AnalyticsEventDirective, AnalyticsHrefListenerDirective} from "./components/analytics-event.directive";
import {CommandGroup, CommandProcessor} from "../../../core/commands";



export const AnalyticsActionsService = new InjectionToken<AnalyticsActions>('AnalyticsActionsService');
export const AnalyticsAdaptorService = new InjectionToken<AnalyticsAdaptor>('AnalyticsAdaptorService');

/*
  usage

  {
    provide: AnalyticsHooksService,
    useValue:[...some analytics hooks],
    multi: true
  }
 */
export const AnalyticsHooksService = new InjectionToken<AnalyticsHook[]>('AnalyticsHooksService');

const ANALYTICS_SERVICE_PROVIDER: Provider = {
  provide: AnalyticsService,
  useFactory: (
      actions: AnalyticsActions,
      adaptor: AnalyticsAdaptor,
      hooks: AnalyticsHook[]): AnalyticsService => {

    const hookGroup: CommandGroup<AnalyticsHook> = new CommandGroup<AnalyticsHook>(),
        processor: CommandProcessor = new CommandProcessor();

    if (Array.isArray(hooks)) {

        hooks = ([] as AnalyticsHook[]).concat(...hooks);

        //hookGroup.addCommands(hooks);
    }

    return new AnalyticsService(actions, adaptor, hookGroup, processor);
  },
  deps: [
    AnalyticsActionsService,
    AnalyticsAdaptorService,
    [new Optional(), AnalyticsHooksService]
  ]
}

const COMPONENTS = [
    AnalyticsEventDirective,
    AnalyticsHrefListenerDirective
];


@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ANALYTICS_SERVICE_PROVIDER
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class AnalyticsModule {}
