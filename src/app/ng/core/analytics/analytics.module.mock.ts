import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnalyticsEventDirectiveMock} from "./components/analytics-event.directive.mock";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AnalyticsEventDirectiveMock],
  exports: [AnalyticsEventDirectiveMock]
})
export class AnalyticsModuleMock {}
