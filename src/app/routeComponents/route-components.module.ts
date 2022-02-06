import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RootRouteComponent} from "./root/root.route.component";
import {ComponentsModule} from "../components/components.module";
import {ExamplesModule} from "../examples/examples.module";
import {ControlsLoaderModule} from "../components/controls/controls-loader.module";
import {DynamicComponentModule} from "../dynamic-component/dynamic-component.module";


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
