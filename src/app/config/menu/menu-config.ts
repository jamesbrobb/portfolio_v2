import {RouteConfig} from "../../route/config/route-config";
import {InjectionToken} from "@angular/core";

export type MenuConfig = MenuItemNode[];

export type MenuItemNode = {
  label: string;
  path: string;
  children?: MenuItemNode[]
}

export function menuConfigFactory(routeConfig: RouteConfig[]): MenuConfig {

  return routeConfig
    .filter((route) => !route.redirectTo)
    .map((route) => parse(route));
}

function parse(route: RouteConfig, parentPath: string = ''): MenuItemNode {

  const path = `${parentPath}/${route.path}`,
    label = route.label ?? route.path.split('-').join(' '),
    children = route.children ? route.children.map((route) => parse(route, path)) : undefined;

  return {
    path,
    label,
    children
  }
}

export const MenuConfigService = new InjectionToken<MenuConfig>('MenuConfigService');
