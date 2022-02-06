import {Observable, of, throwError} from 'rxjs';

import { HttpAdaptor } from './adaptor/http-adaptor';
import { HttpErrorHook } from './error/hook/http-error-hook';
import { HttpResponseHook } from './response/hook/http-response-hook';
import { HttpRequestHook } from './request/hook/http-request-hook';
import { HttpError } from './error/http-error';
import { HttpResponse } from './response/http-response';
import { HttpRequest } from './request/http-request';
import { HttpEndpointConfig } from './endpoint/config/http-endpoint-config';
import {isHttpError} from "./utils/http-type-guards";

export const mockHttpConfig: HttpEndpointConfig = {

    baseUrl: 'api/',
    search: {
        field1: 'field1'
    },
    withCredentials: true,
    cache: true,
    headers: {
        Accept: 'application/json'
    },
    requestHooks: ['mainRequestHook'],
    responseHooks: ['mainResponseHook'],
    errorHooks: ['mainErrorHook'],
    methods: {
        getById: {
            type: 'GET',
            url: ':id/',
            search: {
                field2: 'field2'
            },
            headers: {
                'Cache-control': 'no-cache'
            },
            requestHooks: ['methodRequestHook'],
            responseHooks: ['methodResponseHook'],
            errorHooks: ['methodErrorHook']
        },
        create: {
            type: 'POST',
            url: 'test/',
            search: {
                field2: 'field2'
            },
            headers: {
                'Cache-control': 'no-cache'
            },
            requestHooks: ['methodRequestHook'],
            responseHooks: ['methodResponseHook'],
            errorHooks: ['methodErrorHook']
        }
    }
};

export class MockRequestHook implements HttpRequestHook {

    private _response: HttpResponse | HttpError | undefined;

    constructor(response?: HttpResponse | HttpError) {
        this._response = response;
    }

    public execute(input: HttpRequest): Observable<HttpRequest | HttpResponse | HttpError> {

        if (this._response) {

            if (this._isError(this._response)) {

                return throwError(this._response);

            } else {

                return of(this._response);
            }
        }

        return of(input);
    }

    private _isError(arg: HttpResponse | HttpError): arg is HttpError {

        return arg.status >= 400;
    }
}

export class MockResponseHook implements HttpResponseHook {

    private _error: any;

    constructor(error?: HttpError) {
        this._error = error;
    }

    public execute(input: HttpResponse): Observable<HttpResponse | HttpError> {

        if (this._error) {
            return throwError(this._error);
        }

        return of(input);
    }
}

export class MockErrorHook implements HttpErrorHook {

    public execute(input: HttpError): Observable<HttpError> {

        return of(input);
    }
}

export class MockHttpAdaptor implements HttpAdaptor {

    private _response: HttpResponse | HttpError;

    constructor(response: HttpResponse | HttpError) {
        this._response = response;
    }

    public request(request: HttpRequest): Observable <HttpResponse | HttpError> {

        this._response.request = request;

        if (isHttpError(this._response)) {

            return throwError(this._response);

        } else {

            return of(this._response);
        }
    }
}
