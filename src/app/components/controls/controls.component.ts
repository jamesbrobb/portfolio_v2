import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {ControlGroup} from "../../route/config/route-config";
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";



@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnChanges, OnDestroy {

  @Input() controls!: ControlGroup[];
  @Output() dataChange = new EventEmitter();

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

    const controls: {[key: string]: FormControl} = {};

    this.controls.forEach((control) => {
      controls[control.key] = new FormControl(control.value || '')
    });

    this.form = new FormGroup(controls);
    this._formSubscription = this.form.valueChanges.subscribe((value) => this._formValueChange(value))
  }
}
