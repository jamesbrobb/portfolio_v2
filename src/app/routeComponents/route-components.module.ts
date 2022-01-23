import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RootRouteComponent} from "./root/root.route.component";
import {ComponentsModule} from "../components/components.module";
import {DynamicComponentModule} from "../dynamic-component/dynamic-component.module";
import {ExamplesModule} from "../examples/examples.module";


const COMPONENTS = [
  RootRouteComponent
]


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    DynamicComponentModule,
    ExamplesModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class RouteComponentsModule {}
