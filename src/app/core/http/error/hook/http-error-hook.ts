import {HttpError} from '../http-error';
import {ObservableCommand} from "../../../commands";


export interface HttpErrorHook extends ObservableCommand<HttpError> {}
