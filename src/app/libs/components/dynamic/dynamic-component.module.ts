import {Injector, NgModule, Type} from "@angular/core";

import {CommonModule} from "@angular/common";

import {
  DynamicComponentModuleMap,
  DynamicComponentModuleMapService,
  DynamicComponentService
} from "./dynamic-component-service";

import {DynamicLoaderDirective} from "./dynamic-component.directive";



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: DynamicComponentService,
    useFactory: (inj: Injector, map: DynamicComponentModuleMap) => {
      return new DynamicComponentService(inj, map)
    },
    deps: [
      Injector,
      DynamicComponentModuleMapService
    ]
  }],
  declarations: [DynamicLoaderDirective],
  exports: [DynamicLoaderDirective]
})
export class DynamicComponentModule {}
