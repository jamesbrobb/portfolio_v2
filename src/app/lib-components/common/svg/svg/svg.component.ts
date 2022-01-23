import {Component, Input, OnChanges} from '@angular/core';
import { SvgRegistry } from '../registry/svg-registry';



@Component({
    selector: 'svg-component',
    templateUrl: './svg.component.html',
    styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnChanges {

    @Input('name') ioName: string | undefined;

    private _registry: SvgRegistry;
    public name: string | undefined;

    constructor(registry: SvgRegistry) {
        this._registry = registry;
    }

    public ngOnChanges(): void {
        this._registry.getSvgByName(this.ioName ?? '');
        this.name = this.ioName;
    }
}
