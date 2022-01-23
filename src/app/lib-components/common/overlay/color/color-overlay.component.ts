import {Component, Input, OnChanges} from '@angular/core';



export enum OVERLAY_COLORS {
    BLUE= 'blue',
    DARK_BLUE= 'dark-blue',
    GREEN= 'green',
    RED= 'red',
    PURPLE= 'purple',
    PINK= 'pink',
    GREY= 'grey'
}


@Component({
    selector: 'color-overlay',
    templateUrl: './color-overlay.component.html',
    styleUrls: ['./color-overlay.component.scss']
})
export class ColorOverlayComponent implements OnChanges {

    @Input() color: OVERLAY_COLORS | undefined;
    @Input('allowTransition') ioAllowTransition: boolean | undefined;

    public overlayColor: OVERLAY_COLORS = OVERLAY_COLORS.BLUE;
    public allowTransition: boolean = true;

    public ngOnChanges(): void {
        this.overlayColor = this.color ?? OVERLAY_COLORS.BLUE;
        this.allowTransition = this.ioAllowTransition === undefined ? true : this.ioAllowTransition;
    }
}
