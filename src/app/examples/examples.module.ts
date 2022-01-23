import {NgModule} from "@angular/core";
import {DynamicComponentModuleMapService} from "../dynamic-component/dynamic-component.module";

// THIS FILE IS GENERATED - DO NOT EDIT
@NgModule({
  providers: [{
    provide: DynamicComponentModuleMapService,
    useValue: {
      ColorOverlayExampleModule: () => import('./color-overlay/color-overlay-example.component')
    }
  }]
})
export class ExamplesModule {}
