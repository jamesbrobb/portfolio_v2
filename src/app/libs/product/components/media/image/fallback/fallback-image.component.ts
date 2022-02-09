import {
  Component,
  Input, NgModule,
  OnChanges
} from '@angular/core';
import {CommonModule} from "@angular/common";


export enum FALLBACK_COLORS {
    BLUE= 'blue',
    GREEN= 'green',
    ORANGE= 'orange',
    PURPLE= 'purple',
    WHITE= 'white'
}


@Component({
    selector: 'fallback-image',
    templateUrl: './fallback-image.component.html',
    styleUrls: ['./fallback-image.component.scss']
})
export class FallbackImageComponent implements OnChanges {

    @Input() seed: string | undefined;
    @Input() color: FALLBACK_COLORS | undefined;

    private _fallbackSvgName: string | undefined;

    get fallbackSvgName(): string {

        if(!this._fallbackSvgName) {
            this._fallbackSvgName = this._getSvgName();
        }

        return this._fallbackSvgName;
    }

    public ngOnChanges(): void {

        this._fallbackSvgName = this._getSvgName();
    }

    private _getSvgName(): string {

        let col: string | undefined = this.color;

        if (!col) {
            col = this._calculateColor();
        }

        return `background-${col}`
    }

    private _calculateColor(): string {

        let seedInt: number = NaN;

        if (this.seed) {
            seedInt = parseInt(this.seed.replace(/\D/g, ''));
            seedInt = isNaN(seedInt) ? NaN : seedInt;
        }

        const svgKeys = Object.keys(FALLBACK_COLORS),
          index = !isNaN(seedInt) ? seedInt % svgKeys.length : Math.round(Math.random() * (svgKeys.length - 1));

        return svgKeys[index].toLowerCase();
    }
}


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FallbackImageComponent],
  exports: [FallbackImageComponent]
})
export class FallbackImageComponentModule {}
