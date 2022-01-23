import {InjectionToken, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ExampleLoaderComponent} from "./loader/example-loader.component";
import {ExamplesService} from "./examples-service";
import {DynamicComponentService} from "./dynamic-component-service";


export type DynamicComponentModuleMap = {
  [componentModuleName: string]: () => any
}

export const DynamicComponentModuleMapService = new InjectionToken<DynamicComponentModuleMap>('DynamicComponentModuleMapService');

const COMPONENTS = [
  ExampleLoaderComponent
];


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: ExamplesService,
    useFactory: (map: DynamicComponentModuleMap) => {
      return new ExamplesService(map);
    },
    deps: [DynamicComponentModuleMapService]
  },
    DynamicComponentService
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class DynamicComponentModule {}
