import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, SimpleChanges} from '@angular/core';

import {openClose} from "../../libs/animation";
import {GithubConfig, githubConfigService} from "../../config/github/github-config";
import {PageConfig, Section} from "../../config/page/page-config";
import {ControlGroup} from "../../config/controls/controls-config";



@Component({
    selector: 'page-container',
    templateUrl: './page-container.component.html',
    styleUrls: ['./page-container.component.scss'],
    //changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [openClose()]
})
export class PageContainerComponent implements OnChanges {

  @Input() pageConfig?: PageConfig;

  detailsURI: string | undefined;
  githubLink: string | undefined;
  docURI: string | undefined;
  sections: Section[] | undefined;
  controls: ControlGroup[] | undefined;
  examples: string[] | undefined;

  hasLoaded: boolean = false;
  hasError: boolean = false;
  controlData: {[key: string]: any} = {};

  private _githubConfig: GithubConfig;
  private _loadCount = 0;

  constructor(@Inject(githubConfigService) githubConfig: GithubConfig) {
    this._githubConfig = githubConfig;
  }

  ngOnChanges(changes: SimpleChanges) {

    this.controlData = {};

    this.detailsURI = this.pageConfig?.detailsURI;
    this.githubLink = this.pageConfig?.githubLink;
    this.docURI = this.pageConfig?.docURI;
    this.sections = this.pageConfig?.sections;
    this.controls = this.pageConfig?.controls;
    this.examples = this.pageConfig?.examples;

    this.hasLoaded = false;
    this.hasError = false;
    this._loadCount = 0;
  }

  onLoad($event: string): void {
    this._onLoad();
  }

  onError($event: string): void {
    this._onLoad();
    this.hasError = true;
  }

  onControlDataChange(data: {[key: string]: any}): void {
    this.controlData = data;
    console.log('onControlDataChange', this.controlData);
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

