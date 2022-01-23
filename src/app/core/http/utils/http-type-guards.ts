import { HttpResponse } from '../response/http-response';
import { HttpRequest } from '../request/http-request';
import {HttpError} from "../error/http-error";


export function isHttpRequest(arg: HttpRequest | HttpResponse | HttpError): arg is HttpRequest {
    return 'method' in arg && 'url' in arg;
}

export function isHttpResponse(arg: HttpRequest | HttpResponse | HttpError): arg is HttpResponse {
    return 'status' in arg && (arg as any).status < 400;
}

export function isHttpError(arg: HttpResponse | HttpError): arg is HttpError {
    return 'status' in arg && (arg as any).status >= 400;
}
