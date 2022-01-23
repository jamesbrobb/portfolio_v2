import { HttpRequest } from '../request/http-request';


export interface HttpResponse {
    data: any;
    headers: any;
    status: number;
    statusText: string;
    request: HttpRequest;
}
