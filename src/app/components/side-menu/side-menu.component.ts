import {Component, Output, EventEmitter, Inject} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs";
import {MenuConfig, MenuConfigService, MenuItemNode} from "../../config/menu/menu-config";




@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  @Output() menuItemSelected = new EventEmitter()

  private _router: Router;

  treeControl = new NestedTreeControl<MenuItemNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuItemNode>();

  constructor(router: Router, @Inject(MenuConfigService) config: MenuConfig) {

    this._router = router;
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(this._handleRouteChange);

    this.dataSource.data = config;
    this.treeControl.dataNodes = config;
  }

  hasChild = (_: number, node: MenuItemNode) => !!node.children && node.children.length > 0;

  public onItemClick(): void {
      this.menuItemSelected.emit();
  }

  private _handleRouteChange = (event: any): void => {

    const rEvt: RouterEvent = event as RouterEvent;
    const frags: string[] = rEvt.url.split(/(?=\/)/)
                                    .filter(value => !!value);

    let node: MenuItemNode | undefined,
      nodes: MenuItemNode[] = this.treeControl.dataNodes,
      frag: string = '';

    frags.map((frg: string) => {

      frag = `${frag}${frg}`;
      node = nodes.find((value: MenuItemNode) => value.path === frag);

      if(!node) {
        return;
      }

      if(!this.treeControl.isExpanded(node)){
        this.treeControl.expand(node);
      }

      if(!node.children) {
        return;
      }

      nodes = node.children;
    });
  }
}
