import {Component, Input, OnChanges} from '@angular/core';
import { IconRegistry } from '../registry/icon-registry';



@Component({
    selector: 'icon-component',
    template: `<svg-component [name]="svgName"></svg-component>`,
    styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnChanges {

    @Input() name: string | undefined;

    public svgName:string = '';

    private _registry: IconRegistry;

    constructor( registry: IconRegistry ) {
        this._registry = registry;
    }

    public ngOnChanges(): void {
        this.svgName = this._registry.getIconSvgByName(this.name ?? '');
    }
}
