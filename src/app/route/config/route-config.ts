

export type RouteNode = {
  path: string,
  label?: string,
  redirectTo?: string
}

export type RouteConfig = {
  children?: (RouteConfig | PageConfig)[]
} & RouteNode;

export type PageConfig = {
  detailsURI?: string,
  docURI?: string,
  githubLink?: string,
  controls?: ControlGroup[],
  examples?: string[],
  sections?: string[],
} & RouteNode;

export type ControlGroup = {
  controlType: 'input' | 'select' | 'code-mirror' | 'json-editor',
  key: string,
  label: string,
  type?: 'text' | 'email' | 'url' | 'number' | 'checkbox' | 'radio',
  value?: string,
  options?: [{
    key: string,
    value: string
  }]
};

export const ROUTES_CONFIG_KEY: string = 'routes';

export class RoutesConfig {

  constructor(private _config: RouteConfig[]) {}

  isPathValid(path: string): boolean {

    const routeConfig: RouteConfig | undefined = this.getRouteConfigByPath(path);

    return !!routeConfig;
  }

  getRouteConfigByPath(path: string): RouteConfig | undefined {

    const parts = path === '/' ? [path] : path.split('/').filter(part => !!part);

    let config: RouteConfig[] | undefined = this._config,
      routeConfig: RouteConfig | undefined;

    parts.map(part => {
      routeConfig = config?.find(rConf => rConf.path === part);
      config = routeConfig?.children;
    });

    return routeConfig;
  }
}
