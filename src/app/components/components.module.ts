import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatTreeModule} from "@angular/material/tree";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AppContainerComponent} from "./app-container/app-container.component";
import {PageContainerComponent} from "./page-container/page-container.component";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {MarkdownModule} from "ngx-markdown";
import {AnalyticsModule} from "../libs/ng/core";
import {IconsModule} from "../libs/components/common/icons";

const COMPONENTS = [
  AppContainerComponent,
  SideMenuComponent,
  PageContainerComponent
]

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    AnalyticsModule,
    MarkdownModule.forChild(),
    MatTreeModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatMenuModule,
    IconsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
