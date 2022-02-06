# Analytics NgModule

A module that exposes:

- a directive to track interaction
- url change tracking

It has 3 injection tokens, 2 required and one optional

- AnalyticsActionsService: `AnalyticsActions` - for config
- AnalyticsAdaptorService: `AnalyticsAdaptor` - to supply a tracking library specific adaptor
- AnalyticsHooksService: `AnalyticsHook[]` - Optional - enables a way to supply/configure pre-hooks which execute before the supplied tracking event is sent

<br/>

## Usage

`AppModule`

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AnalyticsModule, GoogleAnalyticsModule} from "./ng/core/";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AnalyticsModule,
    /*
      importing the GoogleAnalyticsModule module automatically creates and
      registers the GaAnalyticsAdaptor for the AnalyticsAdaptorService token
     */
    GoogleAnalyticsModule,
    //...
  ],
  providers: [{
    provide: AnalyticsActionsService,
    useValue: analyticsActionsObject    
  }
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

<br/>
Switching to another analytics tracking service is as simple as removing the `GoogleAnalyticsModule` from imports and creating another 3rd party analytics service adaptor. 
<br/><br/>

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AnalyticsModule, SomeOtherThirdPartyAnalyticsModule} from "./ng/core/";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AnalyticsModule,
    SomeOtherThirdPartyAnalyticsModule,
    //...
  ],
  providers: [{
    provide: AnalyticsActionsService,
    useValue: analyticsActionsObject    
  }
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
