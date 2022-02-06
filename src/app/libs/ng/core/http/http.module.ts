import { HttpClient, HttpClientModule } from '@angular/common/http';
import {InjectionToken, NgModule, Optional, Provider} from '@angular/core';
import {
    HttpEndpointFactory,
    HttpEndpointsConfig,
    HttpEndpointHooks,
    HttpRequestHook,
    HttpResponseHook,
    HttpErrorHook
} from "../../../core";

import {NgHttpAdaptor} from "./adaptor/ng-http-adaptor";




export const HttpEndpointsConfigService = new InjectionToken<HttpEndpointsConfig>('HttpEndpointsConfig');

export const HttpEndpointHooksService = new InjectionToken<HttpEndpointHooks>('HttpRequestHookMap',{
    factory: () => ({
        requestHooks: new Map<string, HttpRequestHook>(),
        responseHooks: new Map<string, HttpResponseHook>(),
        errorHooks: new Map<string, HttpErrorHook>()
    }),
    providedIn: 'root'
});



const HTTP_ENDPOINT_FACTORY_PROVIDER: Provider = {
    provide: HttpEndpointFactory,
    useFactory: (
        httpClient: HttpClient,
        config: HttpEndpointsConfig,
        hooks: HttpEndpointHooks

    ): HttpEndpointFactory => {

        const adaptor = new NgHttpAdaptor(httpClient);

        return new HttpEndpointFactory({
            adaptor,
            config,
            hooks
        });
    },
    deps: [
        HttpClient,
        HttpEndpointsConfigService,
        [new Optional(), HttpEndpointHooksService]
    ]
}


@NgModule({
    imports: [HttpClientModule],
    providers: [HTTP_ENDPOINT_FACTORY_PROVIDER]
})
export class HttpModule {}
