import {NgModule} from "@angular/core";

import {BaseDynamicModule} from "@jbr/components/dynamic/dynamic-component-service";
import {ControlsComponent, ControlsComponentModule} from "./controls.component";



@NgModule({
  imports: [
    ControlsComponentModule
  ]
})
export class ControlsDynamicComponentModule extends BaseDynamicModule {
  static override readonly COMPONENT = ControlsComponent;
  static override readonly MODULE = ControlsComponentModule;
}

