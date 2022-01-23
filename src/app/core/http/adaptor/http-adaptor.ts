import {Observable} from 'rxjs';

import {HttpResponse} from '../response/http-response';
import {HttpError} from '../error/http-error';
import {HttpRequest} from '../request/http-request';



export interface HttpAdaptor {

    request(request: HttpRequest): Observable<HttpResponse|HttpError>;
}
