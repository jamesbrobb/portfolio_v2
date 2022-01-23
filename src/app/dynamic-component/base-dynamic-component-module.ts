// @link https://indepth.dev/posts/1400/components-by-selector-name-angular

import {ComponentFactory, ComponentFactoryResolver, Type} from "@angular/core";


export abstract class BaseDynamicComponentModule {

  private _selectorToFactoryMap: { [key: string]: ComponentFactory<any> } | undefined;

  protected abstract dynamicComponents: Type<any>[];

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver
  ) { }

  public getComponentFactory(selector: string): ComponentFactory<any> | undefined {

    if (!this._selectorToFactoryMap) {
      this._populateRegistry();
    }

    if(!this._selectorToFactoryMap) {
      return;
    }

    return this._selectorToFactoryMap[selector];
  }

  private _populateRegistry() {

    if(!this.dynamicComponents?.length) {
      return;
    }

    this._selectorToFactoryMap = {};

    this.dynamicComponents.forEach(compType => {
      const cFtry = this.componentFactoryResolver.resolveComponentFactory(compType);
      this._selectorToFactoryMap![cFtry.selector] = cFtry;
    });
  }
}
