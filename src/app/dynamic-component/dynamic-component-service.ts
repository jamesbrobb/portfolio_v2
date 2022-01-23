import {
  Compiler,
  ComponentRef,
  Injectable,
  Injector,
  NgModuleFactory,
} from "@angular/core";

import {BaseDynamicComponentModule} from "./base-dynamic-component-module";

export interface DynamicComponent {
  data: {[key: string]:any};
}

@Injectable()
export class DynamicComponentService {

  constructor(
    private _injector: Injector
  ) {}

  getComponentBySelector(
    componentSelector: string,
    moduleLoaderFunction: () => Promise<any>
  ): Promise<ComponentRef<DynamicComponent>> {

    return this.getModuleFactory(moduleLoaderFunction)
      .then((moduleFactory) => {

        const module = moduleFactory.create(this._injector);
        console.log(module.instance instanceof BaseDynamicComponentModule)
        if (module.instance instanceof BaseDynamicComponentModule) {
          const compFactory = module.instance.getComponentFactory(componentSelector);
          return compFactory!.create(module.injector, [], null, module);
        } else {
          throw new Error('Module should extend BaseDynamicComponentModule to use "string" based component selector');
        }
      }
    );
  }

  async getModuleFactory(moduleLoaderFunction: () => Promise<NgModuleFactory<any>>) {

    const ngModuleOrNgModuleFactory = await moduleLoaderFunction();

    let moduleFactory;

    if (ngModuleOrNgModuleFactory instanceof NgModuleFactory) {
      // AOT
      moduleFactory = ngModuleOrNgModuleFactory;

    } else {
      // JIT
      moduleFactory = await this._injector
        .get(Compiler)
        .compileModuleAsync(ngModuleOrNgModuleFactory);
    }

    return moduleFactory;
  }
}
