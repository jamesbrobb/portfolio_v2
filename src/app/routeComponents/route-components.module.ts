import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RootRouteComponent} from "./root/root.route.component";
import {ComponentsModule} from "../components";


const COMPONENTS = [
  RootRouteComponent
]


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class RouteComponentsModule {}
