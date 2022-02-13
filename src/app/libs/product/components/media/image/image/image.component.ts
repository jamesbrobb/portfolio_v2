import {Component, Input, NgModule, OnChanges} from '@angular/core';
import {FALLBACK_COLORS, FallbackImageComponentModule} from '../fallback/fallback-image.component';
import {CommonModule} from "@angular/common";


@Component({
    selector: 'image-component',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnChanges {

    @Input() url?: string;

    @Input() fallbackSeed?: string;
    @Input() fallbackColor?: FALLBACK_COLORS;
    @Input() size?: string;
    @Input() blur?: boolean;

    public iUrl?: string;

    public ngOnChanges(): void {
        this.iUrl = this.url ? this.url.replace('{size}', this.size || '1044w') : '';
    }
}


@NgModule({
  imports: [
    CommonModule,
    FallbackImageComponentModule
  ],
  declarations: [ImageComponent],
  exports: [ImageComponent]
})
export class ImageComponentModule {}
