import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './route/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from "./components/components.module";
import {AppConfigModule} from "./config/app-config.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MarkdownModule} from "ngx-markdown";
import {AnalyticsModule, GoogleAnalyticsModule} from "./ng/core";
import {SvgModule} from "./lib-components/common/svg";
import {IconsModule} from "./lib-components/common/icons";

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
export class AppModule { }
