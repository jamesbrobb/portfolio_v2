import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {PageConfig} from "../../route/config/route-config";



@Component({
  selector: 'app-root.route',
  templateUrl: './root.route.component.html',
  styleUrls: ['./root.route.component.scss']
})
export class RootRouteComponent implements OnInit {

  public pageConfig!: PageConfig;
  public controlData: {[key: string]: any} = {};

  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.data.subscribe(this._handlePageConfigChange);
  }

  ngAfterViewInit() {
    //console.log('ngAfterViewInit', this.app-container)
  }

  onControlDataChange(data: {[key: string]: any}): void {

    this.controlData = data;
    console.log(data);
  }

  private _handlePageConfigChange = (data: Data): void => {

    this.controlData = {};
    this.pageConfig = data['config'];
  }
}
