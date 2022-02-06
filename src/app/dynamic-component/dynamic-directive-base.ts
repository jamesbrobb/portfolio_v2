import {Directive, Host, OnChanges} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {DynamicLoaderDirectiveService} from "./dynamic-component.directive";



@Directive({})
export abstract class DynamicDirectiveBase<T extends OnChanges> {

  protected _destroyed$ = new Subject();
  protected _instance?: T;

  constructor(
    @Host() private _service: DynamicLoaderDirectiveService
  ) {
    this._service.instance$.pipe(
      takeUntil(this._destroyed$)
    )
      .subscribe((instance) => {
        this._instance = instance as T;
        this._setUpInstance();
      })
  }

  ngOnChanges() {
    this._updateInstanceInputs();
  }

  ngOnDestroy() {
    this._destroyed$.next('');
    this._destroyed$.unsubscribe();
  }

  protected abstract _updateInstanceInputValues(): void;
  protected abstract _setUpInstanceOutputs(): void;

  private _updateInstanceInputs(): void {

    if(!this._instance) {
      return;
    }

    this._updateInstanceInputValues();
    this._instance.ngOnChanges({});
  }

  private _setUpInstance(): void {

    if (!this._instance) {
      return;
    }

    this._setUpInstanceOutputs();
    this._updateInstanceInputs();
  }
}
