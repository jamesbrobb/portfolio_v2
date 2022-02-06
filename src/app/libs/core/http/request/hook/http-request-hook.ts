import {ObservableCommand} from "../../../commands";
import { HttpError } from '../../error/http-error';
import { HttpRequest } from '../http-request';
import { HttpResponse } from '../../response/http-response';


export interface HttpRequestHook extends ObservableCommand<HttpRequest, HttpRequest | HttpResponse | HttpError> {}

