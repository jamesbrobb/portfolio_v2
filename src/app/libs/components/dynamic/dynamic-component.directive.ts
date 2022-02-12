import {Subject} from "rxjs";
import {
  ComponentRef,
  Directive,
  Injector,
  OnChanges,
  OnDestroy,
  ViewContainerRef
} from "@angular/core";

import {DynamicComponentService} from "./dynamic-component-service";




@Directive({
  selector: '[abstractDynamicLoader]',
})
export abstract class DynamicLoaderDirective<T> implements OnChanges, OnDestroy {

  protected _destroyed$ = new Subject();
  protected _instance?: T;

  private _componentSelector?: string;
  private _component?: ComponentRef<unknown>;

  constructor(
    private _container: ViewContainerRef,
    private _injector: Injector,
    private _componentService: DynamicComponentService
  ) {}

  ngOnChanges() {
    this._updateInstanceInputs();
  }

  ngOnDestroy() {

    this._destroyed$.next('');
    this._destroyed$.complete();

    this._cleanUp();
  }

  protected _setComponentSelector(selector: string): void {

    if(this._componentSelector && (this._componentSelector === selector)) {
      return;
    }

    this._componentSelector = selector;

    this._cleanUp();
    this._createComponent();
  }

  protected abstract _updateInstanceInputValues(): void;
  protected abstract _setUpInstanceOutputs(): void;

  private async _createComponent(): Promise<void> {

    if(!this._componentSelector) {
      return;
    }

    const {ngModuleRef, componentType} = await this._componentService.loadComponentBySelector(this._componentSelector);

    this._component = this._container.createComponent(componentType, {injector:this._injector, ngModuleRef:ngModuleRef});

    this._setUpInstance();
  }

  private _setUpInstance(): void {

    if (!this._component?.instance) {
      return;
    }

    this._instance = this._component.instance as T;

    this._setUpInstanceOutputs();
    this._updateInstanceInputs();
  }

  private _updateInstanceInputs(): void {

    if(!this._instance) {
      return;
    }

    this._updateInstanceInputValues();

    if(!(this._instance as any).ngOnChanges) {
      return;
    }

    ((this._instance as unknown) as OnChanges).ngOnChanges({});
  }

  private _cleanUp(): void {

    if(!this._component) {
      return;
    }

    this._container.clear();

    this._component?.destroy();
    this._component = undefined;
  }
}
