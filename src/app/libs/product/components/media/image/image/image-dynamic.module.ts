import {NgModule} from "@angular/core";

import {BaseDynamicModule} from "@jbr/components/dynamic/dynamic-component-service";
import {ImageComponent, ImageComponentModule} from "./image.component";



@NgModule({
  imports: [
    ImageComponentModule
  ]
})
export class ImageDynamicComponentModule extends BaseDynamicModule {
  static override readonly COMPONENT = ImageComponent;
  static override readonly MODULE = ImageComponentModule;
}
