import {Observable, of} from 'rxjs';

import { HttpRequest } from '../../request/http-request';
import { HttpRequestHook } from '../../request/hook/http-request-hook';
import { UrlInterpolator } from '../../utils/url/url-interpolator';


export class UrlInterpolatorHook implements HttpRequestHook {

    private _interpolator: UrlInterpolator;

    constructor(interpolator: UrlInterpolator) {
        this._interpolator = interpolator;
    }

    public execute(input: HttpRequest): Observable<HttpRequest> {
        input.url = this._interpolator.interpolate(input.url, input.params);
        return of(input);
    }
}
