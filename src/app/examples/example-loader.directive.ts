import {
  Directive,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {DynamicDirectiveBase} from "@jbr/components/dynamic/dynamic-directive-base";





@Directive({
  selector: '[exampleLoader]'
})
export class ExampleLoaderDirective extends DynamicDirectiveBase<any> {

  @Input() data: {[key:string]: unknown} = {};

  @Output() dataChange = new EventEmitter<any>();

  protected override _updateInstanceInputValues(): void {
    console.log('_updateInstanceInputValues', this.data);
    Object.keys(this.data)
      .forEach((key) => {
        this._instance[key] = this.data[key];
      })
  }

  protected override _setUpInstanceOutputs(): void {

  }
}
