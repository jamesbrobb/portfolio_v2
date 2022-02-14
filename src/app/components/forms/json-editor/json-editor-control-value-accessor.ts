import {ChangeDetectorRef, Directive, OnDestroy, Self} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {JsonEditorComponent} from "./json-editor.component";
import {Subject, takeUntil} from "rxjs";



@Directive({
  selector: '[jsonEditorControl]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: JsonEditorControlValueAccessor
  }]
})
export class JsonEditorControlValueAccessor implements ControlValueAccessor, OnDestroy {

  onChange = (value:unknown) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  private _destroyed$ = new Subject();

  constructor(
    @Self() private _jsonEditor: JsonEditorComponent
  ) {

    this._jsonEditor.onChange.pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(value => this.onChange(value));

    this._jsonEditor.onFocus.pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(value => this.onTouched());
  }

  writeValue(data: {[key: string]: unknown}) {
    this._jsonEditor.value = data;
    this._jsonEditor.ngOnChanges();
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  ngOnDestroy() {
    this._destroyed$.next('');
    this._destroyed$.complete();
  }
}
