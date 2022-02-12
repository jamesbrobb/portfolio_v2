import {Injector, NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";

import {
  DynamicComponentModuleMap,
  DynamicComponentModuleMapService,
  DynamicComponentService
} from "./dynamic-component-service";




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
  }]
})
export class DynamicComponentModule {}
