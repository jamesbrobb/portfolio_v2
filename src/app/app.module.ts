import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './route';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from "./components";
import { AppConfigModule } from "./config/app-config.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MarkdownModule} from "ngx-markdown";
import {IconsModule} from "@jbr/components/common/icons";
import {SvgModule} from "@jbr/components/common/svg";


import {AnalyticsModule, GoogleAnalyticsModule} from "@jbr/ng/core";
import {environment} from "../environments/environment";


const config = environment.configuration;


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    AnalyticsModule,
    GoogleAnalyticsModule,
    AppConfigModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    IconsModule.forRoot(config.icons),
    SvgModule.forRoot(config.svgs)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


