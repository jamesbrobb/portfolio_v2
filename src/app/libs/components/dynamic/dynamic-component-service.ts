import {
  createNgModuleRef,
  InjectionToken,
  Injector,
  NgModuleRef,
  Type
} from "@angular/core";

import {StringUtils} from "@jbr/core/utils";





export abstract class BaseDynamicModule {
  static readonly COMPONENT: Type<unknown>;
  static readonly MODULE: Type<unknown>;
}


export type DynamicComponentModuleMap = {
  [componentModuleName: string]: () => any
}

export const DynamicComponentModuleMapService = new InjectionToken<DynamicComponentModuleMap>('DynamicComponentModuleMapService');


export type DynamicLoadReturnType<T> = {
  ngModuleRef: NgModuleRef<unknown>,
  componentType: Type<T>
}


export class DynamicComponentService {

  private _modulesMap: DynamicComponentModuleMap[]

  constructor(
    private _injector: Injector,
    modulesMap: DynamicComponentModuleMap
  ) {
    this._modulesMap = Array.isArray(modulesMap) ? modulesMap : [modulesMap];
  }

  async loadComponentBySelector<T = unknown>(selector: string): Promise<DynamicLoadReturnType<T>> {

    let func!: Function;

    this._modulesMap.forEach((map) => {

      if(!map[selector]) {
        return;
      }

      func = map[selector];
    });

    if(!func) {
      throw new Error(`no module registered for the selector ${selector}`);
    }

    const module = await func(),
      name = `${StringUtils.toPascalCase(selector)}Component`;

    let moduleType: Type<unknown> = module[`${name}Module`],
      componentType: Type<T>;

    if(moduleType.prototype instanceof BaseDynamicModule) {

      componentType = (moduleType as any).COMPONENT;
      moduleType = (moduleType as any).MODULE;

    } else {

      componentType = module[name];
    }

    return {
      ngModuleRef: createNgModuleRef(moduleType, this._injector),
      componentType
    }
  }
}
