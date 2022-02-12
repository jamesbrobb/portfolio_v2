import {
  Directive,
  EventEmitter,
  Input, OnChanges,
  Output
} from '@angular/core';

import {DynamicLoaderDirective} from "@jbr/components/dynamic/dynamic-component.directive";



@Directive({
  selector: '[exampleLoader]'
})
export class ExampleLoaderDirective extends DynamicLoaderDirective<any> implements OnChanges {

  @Input('exampleLoader') exampleSelector?: string;

  @Input() data: {[key:string]: unknown} = {};

  @Output() dataChange = new EventEmitter<any>();

  override ngOnChanges(): void {

    super.ngOnChanges();

    if(!this.exampleSelector) {
      return;
    }

    this._setComponentSelector(this.exampleSelector);
  }

  protected override _updateInstanceInputValues(): void {
    console.log('_updateInstanceInputValues', this.data);
    Object.keys(this.data)
      .forEach((key) => {
        this._instance[key] = this.data[key];
      })
  }

  protected override _setUpInstanceOutputs(): void {}
}
