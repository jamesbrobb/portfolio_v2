import {debounceTime, Subject, Subscription, takeUntil} from "rxjs";
import {CommonModule} from "@angular/common";
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  NgModule,
  OnChanges,
  OnDestroy, Optional,
  Output
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';

import {JsonEditorComponentModule} from "../forms";
import {map} from "rxjs/operators";
import {ControlsOptionsMap, ControlsOptionsMapService} from "./controls.provider";
import {ControlGroup, ControlGroupOption} from "../../config/controls/controls-config";



export interface ControlComponentIO {
  controls?: ControlGroup[];
  dataChange: EventEmitter<unknown>;
}



@Component({
  selector: 'div[example-controls]',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements ControlComponentIO, OnChanges, OnDestroy {

  @Input() controls?: ControlGroup[];

  @Output() dataChange = new EventEmitter<unknown>();

  public form!: FormGroup;

  private _optionsMap: ControlsOptionsMap | undefined;
  private _formSubscription: Subscription | undefined;
  private _destroy$ = new Subject();
  private _debounce$ = new Subject<{[key: string]: unknown }>();


  constructor(@Optional() @Inject(ControlsOptionsMapService) optionsMap?: ControlsOptionsMap) {
    console.log(optionsMap);
    this._optionsMap = optionsMap;

    this._debounce$
      .pipe(
        takeUntil(this._destroy$),
        debounceTime(100),
        map((value) => this._parseValue(value))
      )
      .subscribe((value) => this.dataChange.emit(value));
  }

  ngOnChanges(): void {
    this._cleanUp();
    this._createFormGroup();
  }

  ngOnDestroy() {
    this._cleanUp();

    this._destroy$.next('');
    this._destroy$.complete();
  }

  private _formValueChange(value: {[key: string]: unknown }, throttle: boolean = true): void {

    if(!throttle) {
      const val = this._parseValue(value);
      this.dataChange.emit(val);
      return;
    }

    this._debounce$.next(value);
  }

  private _cleanUp(): void {
    this._formSubscription?.unsubscribe();
  }

  private _createFormGroup(): void {

    if(!this.controls) {
      return;
    }

    const controls: {[key: string]: FormControl} = {};

    this.controls
      .filter((control) => !!control.key)
      .map((control) => {

        if(control.optionsId) {

          if (this._optionsMap) {
            control.options = this._optionsMap[control.optionsId] as ControlGroupOption[]
          }
        }

        return control;
      })
      .forEach((control) => {
        controls[control.key] = new FormControl(control.value || '')
      });

    this.form = new FormGroup(controls);
    this._formSubscription = this.form.valueChanges.subscribe((value) => this._formValueChange(value));
    this._formValueChange(this.form.value, false);
  }

  private _parseValue(value: {[key: string]: unknown}): {[key: string]: unknown} {

    const res = Object.assign({}, value);

    this.controls?.forEach((control) => {
      if(control.type === 'number') {
        res[control.key] = parseInt(value[control.key] as string);
      }
    });

    return res;
  }
}


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    JsonEditorComponentModule
  ],
  declarations: [ControlsComponent],
  exports: [ControlsComponent]
})
export class ControlsComponentModule {}
