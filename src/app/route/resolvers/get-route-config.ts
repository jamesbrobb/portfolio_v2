import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {RouteConfig, RoutesConfig} from "../config/route-config";
import {Injectable} from "@angular/core";


@Injectable()
export class GetRouteConfig implements Resolve<RouteConfig | undefined> {

  constructor(private _routesConfig: RoutesConfig) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RouteConfig | undefined {
    return this._routesConfig.getRouteConfigByPath(state.url);
  }
}
