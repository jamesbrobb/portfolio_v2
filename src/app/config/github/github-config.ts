import {InjectionToken} from "@angular/core";

export interface GithubConfig {
  readonly root: string;
  readonly app: string;
}

export const githubConfigService = new InjectionToken<GithubConfig>('githubConfigService');
