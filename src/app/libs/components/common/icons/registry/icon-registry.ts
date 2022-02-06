import { SvgRegistry } from '../../svg';
import { IconsConfig, IconConfig } from '../icons.config';


const ERROR_MESSAGES = {
    svgNotFound:`
        EfClassIconRegistry Error.
        registerIcon() Error.
        Icon { ##ICON## } references a non registered svg: {##SVG## }
    `,
    iconNotFound:`
        EfClassIconRegistry Error.
        ##METHOD##() Error.
        Icon { ##ICON## } is not a registered Icon,
        Available icons are:
        ##ICON_LIST##
    `
}


export class IconRegistry {

    private _svgRegistry: SvgRegistry;
    private _config:IconsConfig;

    private _registeredIcons:IconsConfig = {};
    private _availableIconNameList:string[] | undefined;

    constructor(
        svgRegistry: SvgRegistry,
        config: IconsConfig
    ) {
        this._svgRegistry = svgRegistry;
        this._config = config;

        this.registerIcons(this._config);
    }

    public registerIcons(icons: IconsConfig): void {

        Object.keys(icons)
            .map( key => this._registerIcon(key, icons[key]) )

        this._availableIconNameList = Object.keys(this._registeredIcons);
    }

    public isIconRegistered(iconName:string): boolean {

        if (!this._availableIconNameList) {
            return false;
        }

        return this._availableIconNameList.indexOf(iconName) > -1;
    }

    public getIconSvgByName(name:string) : any {

        const icon = this._registeredIcons[name];

        if( !icon ) {
            return this._handleIconNotFoundError(name, 'getIconSvgByName');
        }

        return icon.svg;
    }

    private _registerIcon(name:string, config: IconConfig):void {

        if(this._svgRegistry.isSvgRegistered(config.svg)) {
            this._registeredIcons[name] = config;
        } else {
            this._handleSvgNotFoundError(name, config);
        }
    }

    private _handleSvgNotFoundError(name:string, config:IconConfig):void {

        console.error(
            ERROR_MESSAGES.svgNotFound
            .replace('##ICON##', name)
            .replace('##SVG##', config.svg)
        );
    }

    private _handleIconNotFoundError(name:string, method:string): void {

        console.error(
            ERROR_MESSAGES.iconNotFound
            .replace('##ICON##', name)
            .replace('##METHOD##', method)
            .replace('##ICON_LIST', this._availableIconNameList?.sort().join('\n  - ') ?? '')
        );

    }


}
