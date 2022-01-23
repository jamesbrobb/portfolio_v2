import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColorOverlayComponent} from "./common/overlay/color/color-overlay.component";



const COMPONENTS = [
  ColorOverlayComponent
]


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class LibComponentsModule { }
