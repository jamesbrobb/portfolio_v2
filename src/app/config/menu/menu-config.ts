import {isParentNode, isRedirectNode, RouteConfig, RouteNode} from "../../route";
import {InjectionToken} from "@angular/core";

export type MenuConfig = MenuItemNode[];

export type MenuItemNode = {
  label: string;
  path: string;
  active: number;
  children?: MenuItemNode[]
}

export function menuConfigFactory(routeConfig: RouteConfig): MenuConfig {

  return routeConfig
    .filter((routeNode) => !isRedirectNode(routeNode))
    .map((route) => parse(route));
}

function parse(route: RouteNode, parentPath: string = ''): MenuItemNode {

  const path = `${parentPath}/${route.path}`,
    label = route.label ?? route.path.split('-').join(' '),
    children = isParentNode(route) ? route.children.map((route) => parse(route, path)) : undefined;

  return {
    path,
    label,
    active: 0,
    children
  }
}

export const MenuConfigService = new InjectionToken<MenuConfig>('MenuConfigService');
