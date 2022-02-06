import { HttpHeadersConfig } from '../../../headers/http-headers';
import { HttpHooksConfig, HttpSearchParams } from '../../config/http-endpoint-config';



export interface HttpEndpointMethodConfig extends HttpHooksConfig {

    type: string;
    url?: string;
    baseUrl?: string;
    search?: HttpSearchParams;
    withCredentials?: boolean;
    cache?: boolean;
    headers?: HttpHeadersConfig;
    timeout?: number;
}
