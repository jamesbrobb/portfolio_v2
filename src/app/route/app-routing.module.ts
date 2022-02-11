import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RootRouteComponent} from "../routeComponents/root/root.route.component";
import {RouteComponentsModule} from "../routeComponents/route-components.module";
import {ShouldRedirect} from "./guards/should-redirect";
import {GetRouteConfig} from "./resolvers/get-route-config";



const ROUTES: Routes = [
  {
    path: '**',
    component: RootRouteComponent,
    canActivate: [ShouldRedirect],
    resolve: {
      config: GetRouteConfig
    }
  },
]


@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      enableTracing: false
    }),
    RouteComponentsModule
  ],
  providers: [
    ShouldRedirect,
    GetRouteConfig
  ]
})
export class AppRoutingModule { }
