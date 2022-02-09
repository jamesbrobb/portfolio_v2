import {Subject} from "rxjs";
import {
  ComponentRef,
  Directive,
  Injectable,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  ViewContainerRef
} from "@angular/core";

import {DynamicComponentService} from "./dynamic-component-service";



@Injectable()
export class DynamicLoaderDirectiveService {

  public instance$ = new Subject();

  updateInstance(arg: unknown): void {
    this.instance$.next(arg);
  }
}


@Directive({
  selector: '[dynamicLoader]',
  providers: [
    DynamicLoaderDirectiveService
  ]
})
export class DynamicLoaderDirective implements OnChanges, OnDestroy {

  @Input('dynamicLoader') componentSelector?: string;

  private _componentSelector?: string;
  private _component?: ComponentRef<unknown>;

  constructor(
    private _container: ViewContainerRef,
    private _injector: Injector,
    private _componentService: DynamicComponentService,
    private _service: DynamicLoaderDirectiveService
  ) {}

  ngOnChanges() {

    if(this.componentSelector && (this.componentSelector === this._componentSelector)) {
      return;
    }

    this._componentSelector = this.componentSelector;

    this._cleanUp();
    this._createComponent();
  }

  ngOnDestroy() {
    this._cleanUp();
  }

  private async _createComponent(): Promise<void> {

    if(!this._componentSelector) {
      return;
    }

    const {ngModuleRef, componentType} = await this._componentService.loadComponentBySelector(this._componentSelector);

    this._component = this._container.createComponent(componentType, {injector:this._injector, ngModuleRef:ngModuleRef});

    this._service.updateInstance(this._component.instance);
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
