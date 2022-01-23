# HTTP

A framework agnostic, configurable http solution.

## Endpoints Config

`config.json`

```json
{
    "endpoints": {
        "user": {
            "baseUrl": "/user",
            "withCredentials": true,
            "requestHooks": [
                "SomeGeneralRequestHook"
            ],
            "responseHooks": [
                "SomeGeneralResponseHook"
            ],
            "errorHooks": [
                "SomeGeneralErrorHook"
            ],
            "methods": {
                "get": {
                    "type": "GET",
                    "url": "/:id",
                    "requestHooks": [
                        "SomeMethodSpecificRequestHook"
                    ],
                    "responseHooks": [
                        "SomeMethodSpecificResponseHook"
                    ],
                    "errorHooks": [
                        "SomeMethodSpecificErrorHook"
                    ]
                },
                "update": {
                    "type": "PUT",
                    "url": "/:id/preferences"
                },
                "create": {
                    "type": "POST"
                }
            }
        }
    }
}
```

## Factory Instantiation

```ts
import {HttpEndpointHooks, HttpEndpointsConfig} from "./http-endpoint-factory";
import {HttpAdaptor} from "./adaptor/http-adaptor"

const config: HttpEndpointsConfig = '{...}', // previously loaded config.json
    adaptor: HttpAdaptor = new SomeHttpAdaptor(),
    hooks: HttpEndpointHooks = {
        requestHooks: new Map<string, HttpRequestHook>(),
        responseHooks: new Map<string, HttpResponseHook>(),
        errorHooks: new Map<string, HttpErrorHook>()
    };


hooks.requestHooks.set('SomeGeneralRequestHook', new SomeGeneralRequestHook());
hooks.requestHooks.set('SomeMethodSpecificRequestHook', new SomeMethodSpecificRequestHook());

hooks.responseHooks.set('SomeGeneralResponseHook', new SomeGeneralResponseHook());
hooks.responseHooks.set('SomeMethodSpecificResponseHook', new SomeMethodSpecificResponseHook());

hooks.errorHooks.set('SomeGeneralErrorHook', new SomeGeneralErrorHook());
hooks.errorHooks.set('SomeMethodSpecificErrorHook', new SomeMethodSpecificErrorHook());

const factory = new HttpEndpointFactory({adaptor, config, hooks});

```

## Factory Usage

```ts
/*
 deserialises the config and builds the endpoint
 */
import {HttpEndpoint} from "./http-endpoint";

const userEndpoint: HttpEndpoint = factory.createByType('user');
```

## Endpoint Usage

```ts
import {HttpResponse} from "./http-response";
import {HttpError} from "./http-error";

userEndpoint.request('get', {id: 1})
    .pipe(
        take(1),
        map((response: HttpResponse) => {
            console.log(response.data);
        }),
        catchError((error: HttpError) => {
            console.log(error);
        })
    ).subscribe();
```
