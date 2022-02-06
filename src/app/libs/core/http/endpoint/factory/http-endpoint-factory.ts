import {DefaultUrlInterpolator} from '../../utils/url/default-url-interpolator';
import {HttpAdaptor} from '../../adaptor/http-adaptor';
import {HttpEndpoint} from '../http-endpoint';
import {HttpEndpointConfig} from '../config/http-endpoint-config';
import {HttpEndpointConfigParser} from '../config/parser/http-endpoint-config-parser';
import {HttpEndpointMethod} from '../method/http-endpoint-method';
import {UrlInterpolator} from '../../utils/url/url-interpolator';
import {HttpRequestHook} from '../../request/hook/http-request-hook';
import {HttpResponseHook} from '../../response/hook/http-response-hook';
import {HttpErrorHook} from '../../error/hook/http-error-hook';
import {CommandProcessor} from "../../../commands";



export type HttpEndpointHooks = {
    readonly requestHooks: Map<string, HttpRequestHook>,
    readonly responseHooks: Map<string, HttpResponseHook>,
    readonly errorHooks: Map<string, HttpErrorHook>
}


export interface HttpEndpointsConfig {
    [endpoint: string]: HttpEndpointConfig;
}

export interface HttpEndpointFactoryParams {
    adaptor: HttpAdaptor;
    config: HttpEndpointsConfig;
    hooks: HttpEndpointHooks;
    parser?: HttpEndpointConfigParser;
    interpolator?: UrlInterpolator;
    processor?: CommandProcessor;
}


export class HttpEndpointFactory {

    private readonly _config: HttpEndpointsConfig;
    private readonly _adaptor: HttpAdaptor;
    private readonly _interpolator: UrlInterpolator;
    private readonly _parser: HttpEndpointConfigParser;
    private readonly _hookProcessor: CommandProcessor;
    private readonly _hooks: HttpEndpointHooks;

    private readonly _cache = new Map<string, HttpEndpoint>()


    constructor(params: HttpEndpointFactoryParams) {
        this._config = params.config;
        this._adaptor = params.adaptor;
        this._hooks = params.hooks;
        this._parser = params.parser || new HttpEndpointConfigParser();
        this._interpolator = params.interpolator || new DefaultUrlInterpolator();
        this._hookProcessor = params.processor || new CommandProcessor();
    }

    public create(config: HttpEndpointConfig, clearCache:boolean = false): HttpEndpoint {

        const methods: Map<string, HttpEndpointMethod> = this._parser.parse(config);

        return new HttpEndpoint(methods, this._adaptor, this._interpolator, this._hooks, this._hookProcessor);
    }

    public createByType(endpointType: string): HttpEndpoint {

        if (!this._config) {
            throw new Error('HttpEndpointFactory:createByType:: no config supplied');
        }

        if (!this._config[endpointType]) {
            throw new Error(`HttpEndpointFactory:createByType:: no config supplied for endpointType ${endpointType}`);
        }

        return this.create(this._config[endpointType]);
    }
}
