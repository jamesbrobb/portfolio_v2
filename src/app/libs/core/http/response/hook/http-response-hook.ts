import {ObservableCommand} from "../../../commands";
import { HttpError } from '../../error/http-error';
import { HttpResponse } from '../http-response';


export interface HttpResponseHook extends ObservableCommand<HttpResponse, HttpResponse | HttpError> { }

