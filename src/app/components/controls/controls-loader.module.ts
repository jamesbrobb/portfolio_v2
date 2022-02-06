import {
  Directive,
  EventEmitter,
  Input,
  NgModule,
  Output
} from "@angular/core";

import {takeUntil} from "rxjs";

import {
  DynamicComponentModuleMapService,
  DynamicComponentModule,
  DynamicDirectiveBase
} from "../../dynamic-component";

import {ControlGroup} from "../../route/config/route-config";
import {ControlComponentIO, ControlsComponent} from "./controls.component";



@Directive({
  selector: '[controlsLoaderDirective]'
})
export class ControlsLoaderDirective extends DynamicDirectiveBase<ControlsComponent> implements ControlComponentIO {

  @Input() controls?: ControlGroup[];

  @Output() dataChange = new EventEmitter<any>();

  protected override _updateInstanceInputValues(): void {
    this._instance!.controls = this.controls;
  }

  protected override _setUpInstanceOutputs(): void {
    this._instance!.dataChange
      .pipe(takeUntil(this._destroyed$))
      .subscribe((arg) => this.dataChange.emit(arg));
  }
}


@NgModule({
  imports:[
    DynamicComponentModule
  ],
  providers: [{
    provide: DynamicComponentModuleMapService,
    useValue: {
      'controls-dynamic': () => import('./controls.dynamic.module'),
    },
    multi: true
  }],
  declarations: [ControlsLoaderDirective],
  exports: [ControlsLoaderDirective]
})
export class ControlsLoaderModule {}
