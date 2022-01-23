import {AssetService, AssetServiceConfiguration} from './asset.service';
import {ASSET_TYPE} from '../asset-type';


describe('AssetService', () => {

    const baseUrlNotEndingInSlash: string = 'http://google.com',
        baseUrlEndingInSlash: string = `${baseUrlNotEndingInSlash}/`,
        pathNotStartingWithSlash: string = 'path/to/media',
        pathStartingWithSlash: string = `/${pathNotStartingWithSlash}`,
        validUrl: string = 'http://google.com/path/to/media',
        resizeQueryParam: string = '?resize={size}';

    const config: AssetServiceConfiguration = {
        baseUrl: 'baseUrl',
        paths: {
            image: '/image'
        },
        inValidFirstPathFragments: ['api', 'media']
    };

    let assetService: AssetService;

    function createAssetService(baseUrl: string): AssetService {

        return new AssetService(Object.assign({}, config, {baseUrl: baseUrl}));
    }

    describe('getUrl', () => {

        it('returns a valid url when the baseUrl does not end in a slash and the path does not begin with a slash', () => {

            assetService = createAssetService(baseUrlNotEndingInSlash);

            expect(assetService.getUrl(ASSET_TYPE.VIDEO, pathNotStartingWithSlash)).toEqual(validUrl);
        });

        it('returns a valid url when the baseUrl ends with a slash and the path does not begin with a slash', () => {

            assetService = createAssetService(baseUrlEndingInSlash);

            expect(assetService.getUrl(ASSET_TYPE.VIDEO, pathNotStartingWithSlash)).toEqual(validUrl);
        });

        it('returns a valid url when the base does not end in a slash and the path starts with a slash', () => {

            assetService = createAssetService(baseUrlNotEndingInSlash);

            expect(assetService.getUrl(ASSET_TYPE.VIDEO, pathStartingWithSlash)).toEqual(validUrl);
        });

        it('returns a valid url when the baseUrl ends in a slash and the path starts with a slash', () => {

            assetService = createAssetService(baseUrlEndingInSlash);

            expect(assetService.getUrl(ASSET_TYPE.VIDEO, pathStartingWithSlash)).toEqual(validUrl);
        });

        it('returns a url with any specified invalid path first fragments removed', () => {

            assetService = createAssetService(baseUrlNotEndingInSlash);

            expect(assetService.getUrl(ASSET_TYPE.VIDEO, `media/${pathNotStartingWithSlash}`)).toEqual(validUrl);
        });

        it('returns a url with a resize query param appended when the type is image', () => {

            assetService = createAssetService(baseUrlNotEndingInSlash);

            expect(assetService.getUrl(ASSET_TYPE.IMAGE, pathNotStartingWithSlash)).toEqual(`${validUrl}${resizeQueryParam}`);
        });

        it('returns a url with a resize query param appended when the type is image', () => {

            assetService = createAssetService(baseUrlNotEndingInSlash);

            const id = 'sdhfksjdhi743rlkdfj9kl398';

            expect(assetService.getUrlFromId(ASSET_TYPE.IMAGE, id)).toEqual(`${baseUrlNotEndingInSlash}/image/${id}${resizeQueryParam}`);
        });
    });
});
