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
