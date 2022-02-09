import {Component, Input, NgModule} from '@angular/core';

import {
  ColorOverlayComponentModule,
  OVERLAY_COLORS
} from "@jbr/components/common/overlay/color/color-overlay.component";

import {CommonModule} from "@angular/common";
import {ResponsiveContainerDirectiveModule} from "@jbr/components/responsive/container/responsive-container.directive";
import {FALLBACK_COLORS} from "@jbr/product/components/media/image/fallback/fallback-image.component";
import {ImageComponentModule} from "@jbr/product/components/media/image/image/image.component";



@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

    @Input() title?: string;
    @Input() fallbackSeed?: string;
    @Input() fallbackColor?: FALLBACK_COLORS;
    @Input() overlayColor: OVERLAY_COLORS = OVERLAY_COLORS.BLUE;
    @Input() imageUrl?: string;
    @Input() imageSize?: string;
}


@NgModule({
  imports: [
    CommonModule,
    ImageComponentModule,
    ColorOverlayComponentModule,
    ResponsiveContainerDirectiveModule
  ],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent]
})
export class PageHeaderComponentModule {}
