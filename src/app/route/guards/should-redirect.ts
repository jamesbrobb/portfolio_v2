import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {isRedirectNode, RoutesConfig} from "../config/route-config";


@Injectable()
export class ShouldRedirect implements CanActivate {

  constructor(
    private _router: Router,
    private _routesConfig: RoutesConfig
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

    const routeNode = this._routesConfig.getRouteNodeByPath(state.url);

    if(!isRedirectNode(routeNode)) {
      return true;
    }

    return this._router.parseUrl(routeNode.redirectTo);
  }
}
