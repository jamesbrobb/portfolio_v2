import {NgModule} from '@angular/core';
import {BaseDynamicModule} from "@jbr/components/dynamic/dynamic-component-service";
import {
  ColorOverlayComponent,
  ColorOverlayComponentModule
} from "./color-overlay.component";




@NgModule({
  imports: [
    ColorOverlayComponentModule
  ]
})
export class ColorOverlayDynamicComponentModule extends BaseDynamicModule {

  static override readonly COMPONENT = ColorOverlayComponent;
  static override readonly MODULE = ColorOverlayComponentModule;
}
