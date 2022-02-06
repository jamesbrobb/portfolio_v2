import { HttpEndpointConfigParser } from './http-endpoint-config-parser';
import { HttpRequest } from '../../../request/http-request';
import {HttpHeaders, HttpHeadersConfig} from '../../../headers/http-headers';
import { HttpEndpointMethod } from '../../method/http-endpoint-method';
import { HttpSearchParams } from '../http-endpoint-config';
import { HttpEndpointConfig } from '../http-endpoint-config';


describe('HttpEndpointConfigParser', () => {

    let parser: HttpEndpointConfigParser,
        config: HttpEndpointConfig,
        methods: Map<string, HttpEndpointMethod>,
        method: HttpEndpointMethod,
        request: HttpRequest;

    const methodId = 'getById',
        testHook1: any = {},
        testHook2: any = {};

    function parse(): void {
        methods = parser.parse(config);
        method = methods.get(methodId) as HttpEndpointMethod;
        request = method.toRequest();
    }

    beforeEach(() => {

        const requestHookMap: Map <string, any> = new Map<string, any>(),
            responseHookMap: Map <string, any> = new Map<string, any>(),
            errorHookMap: Map <string, any> = new Map<string, any>();

        requestHookMap.set('testHook1', testHook1);
        requestHookMap.set('testHook2', testHook2);

        responseHookMap.set('testHook1', testHook1);
        responseHookMap.set('testHook2', testHook2);

        errorHookMap.set('testHook1', testHook1);
        errorHookMap.set('testHook2', testHook2);

        config = {
            baseUrl: 'api/',
            search: {
                field1: 'test'
            },
            headers: {
                Accept: 'application/json'
            },
            requestHooks: ['testHook1'],
            responseHooks: ['testHook2'],
            errorHooks: ['testHook2'],
            methods: {
                [methodId]: {
                    type: 'get',
                    url: 'test/',
                    search: {
                        field2: 'test'
                    },
                    headers: {
                        'Cache-control': 'no-cache'
                    },
                    requestHooks: ['testHook2'],
                    responseHooks: ['testHook1'],
                    errorHooks: ['testHook1']
                }
            }
        };

        parser = new HttpEndpointConfigParser();
    });


    describe('parse', () => {

        it('should create a map of methods whose keys match those of the supplied config', () => {

            parse();

            expect(method).toEqual(jasmine.any(HttpEndpointMethod));
        });

        describe('type', () => {

            it('should be set to GET', () => {

                parse();

                expect(request.method).toEqual(config.methods[methodId].type);
            });
        });

        describe('url', () => {

            it('should prepend the config baseUrl to the method url', () => {

                parse();

                expect(request.url).toEqual(`${config.baseUrl}${config.methods[methodId].url}`);
            });

            it('should not prepend baseUrl if non is supplied', () => {

                config.baseUrl = undefined;

                parse();

                expect(request.url).toEqual(config.methods[methodId].url as String);
            });

            it('should override config baseUrl if method baseUrl is supplied', () => {

                const methodBaseUrl = 'api2/';

                config.methods[methodId].baseUrl = methodBaseUrl;

                parse();

                expect(request.url).toEqual(methodBaseUrl + config.methods[methodId].url);
            });
        });

        describe('search', () => {

            beforeEach(() => {

            });

            it('should be set', () => {

                parse();

                const search: HttpSearchParams = request.search as HttpSearchParams;

                expect(search['field1']).toEqual(config.search?.['field1'] as String);
                expect(search['field2']).toEqual(config.methods?.[methodId]?.search?.['field2'] as String);
            });
        });

        describe('withCredentials', () => {

            it('should use default to false if no setting is supplied', () => {

                parse();

                expect(request.withCredentials).toBe(false);
            });

            it('should use the config setting if no method specific setting is supplied', () => {

                config.withCredentials = true;

                parse();

                expect(request.withCredentials).toBe(true);
            });

            it('should override the config setting if a method specific setting is supplied', () => {

                config.withCredentials = true;
                config.methods[methodId].withCredentials = false;

                parse();

                expect(request.withCredentials).toBe(false);
            });

            it('should use method specific setting if supplied', () => {

                config.withCredentials = undefined;
                config.methods[methodId].withCredentials = true;

                parse();

                expect(request.withCredentials).toBe(true);
            });
        });

        describe('cache', () => {

            it('should use default to false if no setting is supplied', () => {

                parse();

                expect(request.cache).toBe(false);
            });

            it('should use the config setting if no method specific setting is supplied', () => {

                config.cache = true;

                parse();

                expect(request.cache).toBe(true);
            });

            it('should override the config setting if a method specific setting is supplied', () => {

                config.cache = true;
                config.methods[methodId].cache = false;

                parse();

                expect(request.cache).toBe(false);
            });

            it('should use method specific setting if supplied', () => {

                config.cache = undefined;
                config.methods[methodId].cache = true;

                parse();

                expect(request.cache).toBe(true);
            });
        });

        describe('headers', () => {

            it('should set headers to empty object literal if none supplied', () => {

                config.headers = undefined;
                config.methods[methodId].headers = undefined;

                parse();

                expect((request.headers as HttpHeaders)).toEqual(jasmine.any(HttpHeaders));
            });

            it('should set config headers', () => {

                parse();

                expect((request.headers as HttpHeaders).get('Accept')).toEqual('application/json');
            });

            it('should set method specific headers', () => {

                parse();

                expect((request.headers as HttpHeaders).get('Cache-control')).toEqual('no-cache');
            });

            it('should override config headers with method specific headers', () => {

                (config.methods[methodId].headers as HttpHeadersConfig)['Accept'] = 'application/xml';

                parse();

                expect((request.headers as HttpHeaders).get('Accept')).toEqual('application/xml');
            });
        });

        describe('hooks maps', () => {


            it('should return an empty array for hooks if no config hooks are present for a specific type', () => {

                parser = new HttpEndpointConfigParser();

                delete config.requestHooks;
                delete config.responseHooks;
                delete config.errorHooks;

                delete config.methods[methodId].requestHooks;
                delete config.methods[methodId].responseHooks;
                delete config.methods[methodId].errorHooks;

                parse();

                expect(method.requestHooks.length).toBe(0);
                expect(method.responseHooks.length).toBe(0);
                expect(method.errorHooks.length).toBe(0);
            });
        });

    });
});
