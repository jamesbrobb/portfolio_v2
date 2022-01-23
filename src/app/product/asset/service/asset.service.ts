import {ASSET_TYPE} from '../asset-type';



export interface AssetServiceConfiguration {
    baseUrl: string;
    paths: {[type: string]: string};
    inValidFirstPathFragments?: string[];
}

export class AssetService {

    private _config: AssetServiceConfiguration;

    constructor(config: AssetServiceConfiguration) {
        this._config = config;
    }

    public getUrl(type: ASSET_TYPE, path: string): string {

        const baseUrl: string = this._config.baseUrl.replace(/\/$/, '');

        if (path.indexOf('/') !== 0) {
            path = `/${path}`;
        }

        path = this._removeInvalidPathFragments(path);

        let url: string = `${baseUrl}${path}`;

        if (type === ASSET_TYPE.IMAGE) {
            url = `${url}?resize={size}`;
        }

        return url;
    }

    public getUrlFromId(type: ASSET_TYPE, id: string): string {

        if (!this._config.paths || this._config.paths[type] === undefined) {
            console.warn(`AssetService:getUrlFromId:: No path configured for type '${type}'`);
            return id;
        }

        const path: string = `${this._config.paths[type]}/${id}`;

        return this.getUrl(type, path);
    }

    private _removeInvalidPathFragments(path: string): string {

        let result: string = path;

        if (!this._config.inValidFirstPathFragments) {
            return result;
        }

        const firstFragmentOfPath = /^\/([^\/]*).*$/.exec(path);

        if (!firstFragmentOfPath) {
            return result;
        }

        this._config.inValidFirstPathFragments.map((frag: string) => {

            if (firstFragmentOfPath[1] !== frag) {
                return;
            }

            result = path.replace(`/${frag}`, '');
        });

        return result;
    }
}
