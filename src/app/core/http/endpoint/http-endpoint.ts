import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import {CommandGroup, CommandProcessor} from "../../commands";

import { HttpAdaptor } from '../adaptor/http-adaptor';
import { HttpEndpointMethod } from './method/http-endpoint-method';
import { HttpError } from '../error/http-error';
import { HttpErrorHook } from '../error/hook/http-error-hook';
import { HttpRequest } from '../request/http-request';
import { HttpRequestOptions } from '../request/http-request-options';
import { HttpRequestHook } from '../request/hook/http-request-hook';
import { HttpResponse } from '../response/http-response';
import { HttpResponseHook } from '../response/hook/http-response-hook';
import { UrlInterpolator } from '../utils/url/url-interpolator';
import { UrlInterpolatorHook } from './hooks/url-interpolator-hook';
import {isHttpError, isHttpRequest, isHttpResponse} from '../utils/http-type-guards';
import {HttpEndpointHooks} from "./factory/http-endpoint-factory";
import {CommandProcessorBypassCondition} from "../../commands/processor/command-processor";




export class HttpEndpoint {

    private _methods: Map<string, HttpEndpointMethod>;
    private _adaptor: HttpAdaptor;
    private _interpolator: UrlInterpolatorHook;
    private _hooksProcessor: CommandProcessor;
    private _hooks: HttpEndpointHooks;


    constructor(
        methods: Map<string, HttpEndpointMethod>,
        adaptor: HttpAdaptor,
        interpolator: UrlInterpolator,
        hooks: HttpEndpointHooks,
        hooksProcessor: CommandProcessor,
    ) {
        this._methods = methods;

        this._adaptor = adaptor;
        this._interpolator = new UrlInterpolatorHook(interpolator);

        this._hooks = hooks;
        this._hooksProcessor = hooksProcessor;
    }

    public request(
        methodId: string,
        params?: { [key: string]: any },
        options?: HttpRequestOptions

    ): Observable<HttpResponse | HttpError> {

        const method: HttpEndpointMethod = this._getMethodById(methodId),
            request: HttpRequest = method.toRequest(params, options),
            requestHooks = new CommandGroup<HttpRequestHook, true>(),
            responseHooks = new CommandGroup<HttpResponseHook, true>(),
            errorHooks = new CommandGroup<HttpErrorHook>();

        requestHooks.addCommand(this._interpolator);
        requestHooks.addCommands(this._getHooks(this._hooks.requestHooks, method.requestHooks));
        responseHooks.addCommands(this._getHooks(this._hooks.responseHooks, method.responseHooks));
        errorHooks.addCommands(this._getHooks(this._hooks.errorHooks, method.errorHooks));

        return this._processRequest(request, requestHooks)
            .pipe(
                mergeMap((response: HttpResponse) => this._processResponse(response, responseHooks)),
                catchError((error: HttpError) => this._processError(error, errorHooks))
            );
    }

    private _getMethodById(id: string): HttpEndpointMethod {

        const method: HttpEndpointMethod | undefined = this._methods.get(id);

        if (!method) {
            throw new Error(`There is no registered http method with the id '${id}'`);
        }

        return method;
    }

    private _getHooks<
        HookMapType extends Map<string, HttpRequestHook | HttpResponseHook | HttpErrorHook>,
        HookType = HookMapType extends Map<string, infer I> ? I : never
    >
    (hookMap: HookMapType, hookKeys: string[]): HookType[] {

        if(!this._hooks || !hookKeys?.length) {
            return [];
        }

        const hks: HookType[] = [];

        hookKeys.forEach((hookKey: string) => {

            let hk: HookType | undefined = hookMap.get(hookKey) as HookType | undefined;

            if(hk === undefined) {
                return;
            }

            hks.push(hk);
        })

        if(hookKeys.length !== hks.length) {
            throw new Error(`${hookKeys.length} Hook keys specified for endpoint but only ${hks.length} found`);
        }

        return hks;
    }

    /*private _process<
        GroupType extends CommandGroup<HttpRequestHook|HttpResponseHook|HttpErrorHook, true>,
        InputType extends HttpRequest | HttpResponse | HttpError = GroupType extends CommandGroup<infer HT, true, infer IO> ? IO : never,
        OutputType extends HttpRequest | HttpResponse | HttpError = GroupType extends CommandGroup<infer HT, true, infer IO, infer AOT> ? IO | AOT : never,
        AOT extends HttpResponse | HttpError = GroupType extends CommandGroup<infer HT, true, infer IO, infer AOT> ? AOT : never
    >
    (hooks: GroupType, input: InputType, bypassCondition: CommandProcessorBypassCondition<InputType, AOT>): Observable<OutputType> {

        return this._hooksProcessor.execute<GroupType, InputType>(hooks, input, bypassCondition)
            .pipe<OutputType>(
                mergeMap((result: OutputType) => {

                    if(bypassCondition(result)) {
                        return result;
                    }

                    return of(result);
                })
            )
    }*/

    private _processRequest(request: HttpRequest, hooks: CommandGroup<HttpRequestHook>): Observable<HttpResponse | HttpError> {

        return this._hooksProcessor.execute(hooks, request, isHttpResponse)
          .pipe(
            mergeMap((result ) => {

              if(isHttpRequest(result)) {
                return this._adaptor.request(request);
              }

              return of(result);
            })
          );
    }

    private _processResponse(response: HttpResponse, hooks: CommandGroup<HttpResponseHook>): Observable<HttpResponse | HttpError> {

        return this._hooksProcessor.execute(hooks, response, isHttpError)
            .pipe(
                mergeMap((result) => {

                    if(isHttpError(result)) {
                        return throwError(result);
                    }

                    return of(result);
                })
            );
    }

    private _processError(error: HttpError, hooks: CommandGroup<HttpErrorHook>): Observable<HttpError> {

        return this._hooksProcessor.execute(hooks, error)
            .pipe(
                mergeMap((output: HttpError) => {

                    if (!isHttpResponse(output)) {
                        return throwError(output);
                    }

                    return of(output);
                })
            );
    }
}
