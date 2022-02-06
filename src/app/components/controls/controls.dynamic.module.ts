import {NgModule} from "@angular/core";
import {ControlsComponent, ControlsModule} from "./controls.component";
import {BaseDynamicModule} from "../../dynamic-component";



@NgModule({
  imports: [
    ControlsModule
  ]
})
export class ControlsDynamicComponentModule extends BaseDynamicModule {
  static override readonly COMPONENT = ControlsComponent;
  static override readonly MODULE = ControlsModule;
}

