import {Subscription} from "rxjs";
import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, NgModule, OnChanges, OnDestroy, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ControlGroup} from "../../route/config/route-config";
import {JsonEditorComponentModule} from "../forms/json-editor/json-editor.component";



export interface ControlComponentIO {
  controls?: ControlGroup[];
  dataChange: EventEmitter<unknown>;
}



@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements ControlComponentIO, OnChanges, OnDestroy {

  @Input() controls?: ControlGroup[];

  @Output() dataChange = new EventEmitter<unknown>();

  public form!: FormGroup;

  private _formSubscription: Subscription | undefined;

  ngOnChanges(): void {
    this._cleanUp();
    this._createFormGroup();
  }

  ngOnDestroy() {
    this._cleanUp();
  }

  private _formValueChange(value: unknown): void {
    this.dataChange.emit(value);
  }

  private _cleanUp(): void {
    this._formSubscription?.unsubscribe();
  }

  private _createFormGroup(): void {

    if(!this.controls) {
      return;
    }

    const controls: {[key: string]: FormControl} = {};

    this.controls.forEach((control) => {
      controls[control.key] = new FormControl(control.value || '')
    });

    this.form = new FormGroup(controls);
    this._formSubscription = this.form.valueChanges.subscribe((value) => this._formValueChange(value))
  }
}


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JsonEditorComponentModule
  ],
  declarations: [ControlsComponent],
  exports: [ControlsComponent]
})
export class ControlsModule {}
