import {NgModule, Component, Input, OnDestroy} from '@angular/core';
import {CommonModule} from "@angular/common";

import {ColorOverlayComponentModule} from "../../libs/components/common/overlay/color/color-overlay.component";


// THIS CODE IS GENERATED - DO NOT EDIT
@Component({
  selector: 'color-overlay-example',
  template: `<color-overlay
  [color]="data.color"
  [allowTransition]="data.allowTransition">
</color-overlay>
`
})
export class ColorOverlayExampleComponent implements OnDestroy {

  @Input() data: any;

  ngOnDestroy() {
    console.log('ColorOverlayExampleComponent::ngOnDestroy')
  }
}

// THIS CODE IS GENERATED - DO NOT EDIT
@NgModule({
  imports: [
    CommonModule,
    ColorOverlayComponentModule
  ],
  declarations: [
    ColorOverlayExampleComponent
  ]
})
export class ColorOverlayExampleComponentModule {}
