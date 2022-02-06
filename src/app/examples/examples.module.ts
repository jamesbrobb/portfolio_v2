import {NgModule} from "@angular/core";
import {DynamicComponentModuleMapService} from "../dynamic-component/dynamic-component-service";
import {ExampleLoaderComponent} from "./example-loader.component";
import {DynamicComponentModule} from "../dynamic-component/dynamic-component.module";


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
    },
    multi: true
  }],
  declarations:[ExampleLoaderComponent],
  exports: [ExampleLoaderComponent]
})
export class ExamplesModule {}
