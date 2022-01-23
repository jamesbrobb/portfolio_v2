import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatTreeModule} from "@angular/material/tree";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AppContainerComponent} from "./app-container/app-container.component";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {MatButtonModule} from "@angular/material/button";
import {ControlsComponent} from "./controls/controls.component";
import {PageContainerComponent} from "./page-container/page-container.component";
import {CodemirrorComponent} from "./forms/codemirror/codemirror.component";
import {JsonEditorComponent} from "./forms/json-editor/json-editor.component";
import {MarkdownModule} from "ngx-markdown";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AnalyticsModule} from "../ng/core";
import {IconsModule} from "../lib-components/common/icons";

const COMPONENTS = [
  AppContainerComponent,
  SideMenuComponent,
  ControlsComponent,
  PageContainerComponent,
  CodemirrorComponent,
  JsonEditorComponent
]

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
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
