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
      'color-overlay-example': () => import('./color-overlay/color-overlay-example.component'),
      'grid-layout-example': () => import('./grid-layout/grid-layout-example.component'),
      'responsive-container-example': () => import('./responsive-container/responsive-container-example.component'),
      'page-header-example': () => import('./page-header/page-header-example.component')
    },
    multi: true
  }],
  declarations:[ExampleLoaderDirective],
  exports: [ExampleLoaderDirective]
})
export class ExamplesModule {}
