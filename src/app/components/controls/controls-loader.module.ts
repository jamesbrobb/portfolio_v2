import {
  Directive,
  EventEmitter,
  Input,
  NgModule,
  Output
} from "@angular/core";

import {takeUntil} from "rxjs";

import {ControlGroup} from "../../route";
import {ControlComponentIO, ControlsComponent} from "./controls.component";
import {DynamicDirectiveBase} from "@jbr/components/dynamic/dynamic-directive-base";
import {DynamicComponentModule} from "@jbr/components/dynamic/dynamic-component.module";
import {DynamicComponentModuleMapService} from "@jbr/components/dynamic/dynamic-component-service";



@Directive({
  selector: '[controlsLoader]'
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
