import { HttpResponse } from '../response/http-response';


export interface HttpError extends HttpResponse {
    error: true;
}
