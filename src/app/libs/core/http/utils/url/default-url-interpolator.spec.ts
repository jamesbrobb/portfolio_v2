import { UrlInterpolator } from './url-interpolator';
import {DefaultUrlInterpolator} from './default-url-interpolator';



describe('DefaultUrlInterpolator', () => {

    let interpolator: UrlInterpolator;

    const urlWithNoParams = 'http://google.com',
        urlWithParams = 'http://google.com/:id/:itemId/';

    beforeEach(() => {
        interpolator = new DefaultUrlInterpolator();
    });

    it('returns the initial url when no params are required', () => {

        expect(interpolator.interpolate(urlWithNoParams)).toBe(urlWithNoParams);
        expect(interpolator.interpolate(urlWithNoParams, {id: 1, itemId: 2})).toBe(urlWithNoParams);
    });

    it('adds the supplied params to the url', () => {

        expect(interpolator.interpolate(urlWithParams, {id: 1, itemId: 2})).toBe('http://google.com/1/2/');
    });

    it('errores if any of the required params are not supplied', () => {

        expect(() => {
            interpolator.interpolate(urlWithParams, {id: 1});
        })
        .toThrowError();
    });
});

