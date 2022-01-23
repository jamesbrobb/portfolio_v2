import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {RoutesConfig} from "../config/route-config";


@Injectable()
export class ShouldRedirect implements CanActivate {

  constructor(
    private _router: Router,
    private _routesConfig: RoutesConfig
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

    const routeConfig = this._routesConfig.getRouteConfigByPath(state.url);

    if(!routeConfig?.redirectTo) {
      return true;
    }

    return this._router.parseUrl(routeConfig.redirectTo);
  }
}
