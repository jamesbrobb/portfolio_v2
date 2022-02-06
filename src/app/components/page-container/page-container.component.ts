import {
    Component,
    Inject,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';

import {openClose} from "../../libs/animation";
import {GithubConfig, githubConfigService} from "../../config/github/github-config";


interface Section {
    isOpen: boolean;
    readonly label: string;
    readonly docURI: string;
    readonly githubLink?: string;
}







@Component({
    selector: 'page-container',
    templateUrl: './page-container.component.html',
    styleUrls: ['./page-container.component.scss'],
    animations: [openClose]
})
export class PageContainerComponent implements OnChanges {

  @Input('detailsURI') ioDetailsURI: string | undefined;
  @Input('githubLink') ioGithubLink: string | undefined;
  @Input('docURI') ioDocURI: string | undefined;
  @Input('sections') ioSections: Section[] | undefined;

  detailsURI: string | undefined;
  githubLink: string | undefined;
  docURI: string | undefined;
  sections: Section[] | undefined;
  hasLoaded: boolean = false;
  hasError: boolean = false;

  private _githubConfig: GithubConfig;
  private _loadCount = 0;

  constructor(@Inject(githubConfigService) githubConfig: GithubConfig) {
    this._githubConfig = githubConfig;
  }

  ngOnChanges(changes: SimpleChanges) {

    this.detailsURI = this.ioDetailsURI;
    this.githubLink = this.ioGithubLink;

    this.hasLoaded = false;
    this.hasError = false;
    this._loadCount = 0;

    this.docURI = this.ioDocURI;
    this.sections = this.ioSections;
  }

  onLoad($event: string): void {
    this._onLoad();
  }

  onError($event: string): void {
    this._onLoad();
    this.hasError = true;
  }

  onGithubLinkSelect(path: string): void {
    let link: string = this._githubConfig.root;

    if(this.githubLink !== '/') {
      link = `${link}${this._githubConfig.app}${path}`
    }

    window.open(link);
  }

  private _onLoad(): void {
    this._loadCount++;
    this.hasLoaded = true;
  }
}
