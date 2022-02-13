import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {PageConfig, PagesConfig} from "../../config/page/page-config";
import {isPageNode} from "../../route";



@Component({
  selector: 'app-root.route',
  templateUrl: './root.route.component.html',
  styleUrls: ['./root.route.component.scss']
})
export class RootRouteComponent implements OnInit {

  public pageConfig?: PageConfig;

  constructor(
    private _route: ActivatedRoute,
    private _pagesConfig: PagesConfig
  ) {}

  ngOnInit() {
    this._route.data.subscribe(this._handlePageChange);
  }

  private _handlePageChange = (data: Data): void => {

    const config = data['config'];

    this.pageConfig = isPageNode(config) ? this._pagesConfig.getPageConfigById(config.pageId) : undefined;
  }
}
