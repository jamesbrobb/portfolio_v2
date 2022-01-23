import {Observable} from "rxjs";
import {map, retry} from "rxjs/operators";

import {
  HttpClient,
  HttpHeaders,
  HttpResponse as NgHttpResponse
} from "@angular/common/http";

import {
  HttpAdaptor,
  HttpError,
  HttpRequest,
  HttpResponse
} from "../../../../core";



export class NgHttpAdaptor implements HttpAdaptor {

    private _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;
    }

    request(request: HttpRequest): Observable<HttpResponse|HttpError> {

        const headers: HttpHeaders = new HttpHeaders(request.headers?.toObject());

        return this._http.request(
            request.method.toUpperCase(),
            request.url,
            {
                body: request.data,
                headers: headers,
                params: request.search,
                withCredentials: request.withCredentials,
                observe: 'response'
            }
        ).pipe(
            retry(3),
            map( (response: NgHttpResponse<any>) => {
                return {
                    data: response.body,
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText,
                    request: request
                };
            })
        );
    }
}
