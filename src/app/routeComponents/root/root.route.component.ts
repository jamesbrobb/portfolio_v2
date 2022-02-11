import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {PageConfig} from "../../config/page/page-config";
import {isPageNode} from "../../route";



@Component({
  selector: 'app-root.route',
  templateUrl: './root.route.component.html',
  styleUrls: ['./root.route.component.scss']
})
export class RootRouteComponent implements OnInit {

  public pageConfig?: PageConfig;

  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.data.subscribe(this._handlePageConfigChange);
  }

  private _handlePageConfigChange = (data: Data): void => {

    const config = data['config'];

    this.pageConfig = isPageNode(config) ? config.page : undefined;
  }
}
