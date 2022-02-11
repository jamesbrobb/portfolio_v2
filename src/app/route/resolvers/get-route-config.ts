import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {RouteNode, RoutesConfig} from "../config/route-config";
import {Injectable} from "@angular/core";


@Injectable()
export class GetRouteConfig implements Resolve<RouteNode | undefined> {

  constructor(private _routesConfig: RoutesConfig) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RouteNode | undefined {
    return this._routesConfig.getRouteNodeByPath(state.url);
  }
}
