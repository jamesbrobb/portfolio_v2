import {Component, Input, OnDestroy} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ComponentFactoryResolver, NgModule} from "@angular/core";
import {BaseDynamicComponentModule} from "../../dynamic-component/base-dynamic-component-module";

import {LibComponentsModule} from "../../lib-components/lib-components.module";


// THIS FILE IS GENERATED - DO NOT EDIT
@Component({
  selector: 'color-overlay-example',
  template: `<color-overlay class="overlay"
  [color]="data['color']"
  [allowTransition]="data['allowTransition']">
</color-overlay>`
})
export class ColorOverlayExampleComponent implements OnDestroy {

  @Input() data: any;

  ngOnDestroy() {
    console.log('ColorOverlayExampleComponent::ngOnDestroy')
  }
}

// THIS FILE IS GENERATED - DO NOT EDIT
@NgModule({
  imports: [
    CommonModule,
    LibComponentsModule
  ],
  declarations: [
    ColorOverlayExampleComponent
  ]
})
export class ColorOverlayExampleModule extends BaseDynamicComponentModule {

  dynamicComponents = [ColorOverlayExampleComponent];

  constructor(componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
}
