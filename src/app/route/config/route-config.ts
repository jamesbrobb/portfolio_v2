import {TypeGuard} from "@jbr/types";
import {walk} from "@jbr/core/utils";

export type RouteConfig = RouteNode[];

export type RouteNodeBase = {
  path: string,
  label?: string,
}

export type RouteNode = RedirectNode | ParentNode | PageNode

export type RedirectNode = {
  redirectTo: string
} & RouteNodeBase

export type ParentNode = {
  children: (RedirectNode | ParentNode | PageNode)[]
} & RouteNodeBase;

export type PageNode = {
  pageId: string
} & RouteNodeBase;


export const isRedirectNode = routeNodeGuard<RedirectNode>('redirectTo');
export const isParentNode = routeNodeGuard<ParentNode>('children');
export const isPageNode = routeNodeGuard<PageNode>('pageId');

type routeNodeGuardProp<NT> = NT extends RouteNode ? keyof Omit<NT, keyof RouteNodeBase> : never

function routeNodeGuard<NT extends RouteNode>(prop: routeNodeGuardProp<NT>): TypeGuard<RouteNode | undefined, NT> {
  return (node: RouteNode | undefined): node is NT => !!node && prop in node;
}




export const ROUTES_CONFIG_KEY: string = 'routes';

export class RoutesConfig {

  constructor(private _config: RouteConfig) {
    this._parseConfig();
  }

  isPathValid(path: string): boolean {

    const routeNode: RouteNode | undefined = this.getRouteNodeByPath(path);

    return !!routeNode;
  }

  getRouteNodeByPath(path: string): RouteNode | undefined {

    const parts = path === '/' ? [path] : path.split('/').filter(part => !!part);

    let config: RouteConfig | undefined = this._config,
      routeNode: RouteNode | undefined;

    parts.map(part => {
      routeNode = config?.find(rConf => rConf.path === part);
      config = isParentNode(routeNode) ? routeNode.children : undefined;
    });

    return routeNode;
  }

  private _parseConfig(): void {

    walk<RouteNode, ParentNode>(this._config, isParentNode, 'children', (node) => {

      if (!isPageNode(node) || (node.pageId && node.pageId !== '%path%')) {
        return;
      }

      node.pageId = node.path;
    })
  }
}
