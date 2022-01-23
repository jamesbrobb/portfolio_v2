import { DomSanitizer } from '@angular/platform-browser';

import { SvgConfig } from '../svg.config';
import {MatIconRegistry} from "@angular/material/icon";

const ERROR_MESSAGES = {
    svgNotFound: `
    EfClassSvgRegistry Error. Svg not found
    Svg { ##NAME## } is not a registered svg.

    Available Svg names are:
    ##LIST##
    `
};

export class SvgRegistry {

    private _materialIconRegistry: MatIconRegistry;
    private _sanitizer: DomSanitizer;
    private _config: SvgConfig;

    private _registeredSvgs: any = {};
    private _availableSvgNameList: string[] | undefined;

    constructor(
        materialIconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        config: any
    ) {

        this._materialIconRegistry = materialIconRegistry;
        this._sanitizer = sanitizer;
        this._config = config;

        this.registerSvgs(this._config);
    }

    public registerSvgs(icons: any): void {

        this._addSvgToMaterialIconRegistry(icons);
        this._registeredSvgs = Object.assign(this._registeredSvgs, icons);
    }

    public isSvgRegistered(svgName: string): boolean {

        if (!this._availableSvgNameList) {
            return false;
        }

        return this._availableSvgNameList.indexOf(svgName) > -1;
    }

    public getSvgByName(name: string): any {

        const svg = this._registeredSvgs[name];

        if ( !svg ) {
            return this._handleSvgNotFoundError(name);
        }

        return svg;
    }

    private _addSvgToMaterialIconRegistry(icons: any): void {

        this._availableSvgNameList = Object.keys(icons);

        this._availableSvgNameList
            .map(key => {
                const path = this._sanitizer.bypassSecurityTrustResourceUrl(icons[key].path);
                this._materialIconRegistry.addSvgIcon(key, path);
            });
    }

    private _handleSvgNotFoundError(name: string): void {

        console.warn(
            ERROR_MESSAGES.svgNotFound
                .replace('##NAME##', name)
                .replace('##LIST', '\n  • ' + this._availableSvgNameList?.sort().join('\n  • ') )
        );
    }
}
