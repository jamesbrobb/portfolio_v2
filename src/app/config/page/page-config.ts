import {ControlGroup} from "../controls/controls-config";


export type Section = {
  isOpen: boolean;
  readonly label: string;
  readonly docURI: string;
  readonly githubLink?: string;
}

export type PageConfig = {
  detailsURI?: string,
  docURI?: string,
  githubLink?: string,
  controls?: ControlGroup[],
  examples?: string[],
  sections?: Section[]
}

export type PagesConfigMap = {[pageId: string]: PageConfig};


export const PAGES_CONFIG_KEY: string = 'pages';

export class PagesConfig {

  constructor(private _pagesConfig: PagesConfigMap) {}

  getPageConfigById(id: string): PageConfig | undefined {
    return this._pagesConfig[id];
  }
 }
