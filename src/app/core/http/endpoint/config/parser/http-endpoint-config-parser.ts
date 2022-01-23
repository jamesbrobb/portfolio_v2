import { ObjectUtils } from '../../../../utils/';

import { HttpEndpointMethod } from '../../method/http-endpoint-method';
import { HttpEndpointMethodConfig } from '../../method/config/http-endpoint-method-config';
import { HttpEndpointMethodSignature } from '../../method/http-endpoint-method';
import { HttpHeaders } from '../../../headers/http-headers';
import { HttpHeadersConfig } from '../../../headers/http-headers';
import { HttpSearchParams, HttpEndpointConfig } from '../http-endpoint-config';



export class HttpEndpointConfigParser {

    public parse(config: HttpEndpointConfig): Map <string, HttpEndpointMethod> {

        const methodMap: Map<string, HttpEndpointMethod> = new Map<string, HttpEndpointMethod>(),
            methods: {[methodId: string]: HttpEndpointMethodConfig} = config.methods;

        Object.keys(methods)
          .map((key: string) => {
              methodMap.set(key, this._createMethod(config, methods[key]));
          });

        return methodMap;
    }

    private _createMethod(config: HttpEndpointConfig, methodConfig: HttpEndpointMethodConfig): HttpEndpointMethod {

        const signature: HttpEndpointMethodSignature = {

            type: methodConfig.type,
            url: this._resolveUrl(config, methodConfig),
            search: this._resolveSearch(config.search, methodConfig.search),
            withCredentials: methodConfig.withCredentials !== undefined ? methodConfig.withCredentials : config.withCredentials,
            timeout: !!methodConfig.timeout ? methodConfig.timeout : config.timeout,
            cache: methodConfig.cache !== undefined ? methodConfig.cache : config.cache,
            headers: this._createHeaders(config.headers, methodConfig.headers),
            requestHooks: ([] as string[]).concat(config.requestHooks || []).concat(methodConfig.requestHooks || []),
            responseHooks: ([] as string[]).concat(config.responseHooks || []).concat(methodConfig.responseHooks || []),
            errorHooks: ([] as string[]).concat(config.errorHooks || []).concat(methodConfig.errorHooks || [])
        };

        return new HttpEndpointMethod(signature);
    }

    private _resolveUrl(config: HttpEndpointConfig, methodConfig: HttpEndpointMethodConfig): string {

        const baseUrl: string = methodConfig.baseUrl || config.baseUrl || '';

        return baseUrl + (methodConfig.url || '');
    }

    private _resolveSearch(config: HttpSearchParams | undefined, method: HttpSearchParams | undefined): HttpSearchParams {

        const search: HttpSearchParams = {};

        if (config) {
            ObjectUtils.simpleMerge(search, config);
        }

        if (method) {
            ObjectUtils.simpleMerge(search, method);
        }

        return search;
    }

    private _createHeaders(
        configHeaders: HttpHeadersConfig = {},
        methodHeaders: HttpHeadersConfig = {}

    ): HttpHeaders {

        const headers: HttpHeaders = new HttpHeaders();

        headers.fromObject(configHeaders);
        headers.fromObject(methodHeaders);

        return headers;
    }

}
