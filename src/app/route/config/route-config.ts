
export type RouteConfig = RouteNode[];

export type RouteNodeBase = {
  path: string,
  label?: string,
}

export type RouteNode = RedirectNode | ParentNode | PageNode

export type RedirectNode = {
  redirectTo: string
} & RouteNodeBase

export function isRedirectNode(node: RouteNode | undefined): node is RedirectNode {
  return !!node && 'redirectTo' in node;
}

export type ParentNode = {
  children: (RedirectNode | ParentNode | PageNode)[]
} & RouteNodeBase;

export function isParentNode(node: RouteNode | undefined): node is ParentNode {
  return !!node && 'children' in node;
}

export type PageNode = {
  pageId: string
} & RouteNodeBase;

export function isPageNode(node: RouteNode | undefined): node is PageNode {
  return !!node && 'pageId' in node;
}







export const ROUTES_CONFIG_KEY: string = 'routes';

export class RoutesConfig {

  constructor(private _config: RouteConfig) {}

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
}
