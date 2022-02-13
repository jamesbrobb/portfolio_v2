import {NgModule} from "@angular/core";

import {BaseDynamicModule} from "@jbr/components/dynamic/dynamic-component-service";
import {FallbackImageComponent, FallbackImageComponentModule} from "./fallback-image.component";



@NgModule({
  imports: [
    FallbackImageComponentModule
  ]
})
export class FallbackImageDynamicComponentModule extends BaseDynamicModule {
  static override readonly COMPONENT = FallbackImageComponent;
  static override readonly MODULE = FallbackImageComponentModule;
}
