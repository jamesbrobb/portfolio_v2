import { HttpHeaders } from '../headers/http-headers';



export interface HttpRequestOptions {

    search?: {[key: string]: any};
    data?: any;
    headers?: HttpHeaders;
    withCredentials?: boolean;
    cache?: boolean|{[key: string]: any};
    timeout?: number;
}
