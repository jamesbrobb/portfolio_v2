import { HttpRequestOptions } from './http-request-options';



export interface HttpRequest extends HttpRequestOptions {

    method: string;
    url: string;
    params?: {[key: string]: any};
}
