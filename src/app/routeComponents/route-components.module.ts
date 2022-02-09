import {CommonModule} from "@angular/common";
import {Inject, NgModule} from "@angular/core";
import {RootRouteComponent} from "./root/root.route.component";
import {ComponentsModule} from "../components";
import {ExamplesModule} from "../examples";
import {ControlsLoaderModule} from "../components/controls/controls-loader.module";
import {DynamicComponentModule} from "@jbr/components/dynamic/dynamic-component.module";


const COMPONENTS = [
  RootRouteComponent
]


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ExamplesModule,
    ControlsLoaderModule,
    DynamicComponentModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class RouteComponentsModule {}
