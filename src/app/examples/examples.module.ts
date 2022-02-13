import {NgModule} from "@angular/core";

import {DynamicComponentModule} from "@jbr/components/dynamic/dynamic-component.module";
import {DynamicComponentModuleMapService} from "@jbr/components/dynamic/dynamic-component-service";
import {ExampleLoaderDirective} from "./example-loader.directive";

// THIS FILE IS GENERATED - DO NOT EDIT
@NgModule({
imports:[
    DynamicComponentModule
  ],
  providers: [{
    provide: DynamicComponentModuleMapService,
    useValue: {
      'color-overlay-dynamic': () => import('@jbr/components/common/overlay/color/color-overlay-dynamic.module'),
      'grid-layout-example': () => import('./grid-layout/grid-layout-example.component'),
      'responsive-container-example': () => import('./responsive-container/responsive-container-example.component'),
      'page-header-example': () => import('./page-header/page-header-example.component'),
      'flex-grid-example': () => import('./flex-grid/flex-grid-example.component'),
      'fallback-image-dynamic': () => import('@jbr/product/components/media/image/fallback/fallback-image-dynamic.module'),
      'image-dynamic': () => import('@jbr/product/components/media/image/image/image-dynamic.module')
    },
    multi: true
  }],
  declarations:[ExampleLoaderDirective],
  exports: [ExampleLoaderDirective]
})
export class ExamplesModule {}
