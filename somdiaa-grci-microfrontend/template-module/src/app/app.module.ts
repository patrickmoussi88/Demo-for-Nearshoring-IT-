import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EmptyRouteComponent} from "./empty-route/empty-route.component";
import {RouterModule} from "@angular/router";
import {TEMPLATE_ROUTES} from "./app.routes";
import {LateralNavbarComponent} from "./lateral-navbar/lateral-navbar.component";
import {NavbarTopComponent} from "./navbar-top/navbar-top.component";
import {RequestInterceptorProvider} from "./interceptors/request.interceptor";
import {ResponseInterceptorProvider} from "./interceptors/response.interceptor";
import { AuthorizeDirective } from './directives/authorize.directive';


@NgModule({
  declarations: [
    EmptyRouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(TEMPLATE_ROUTES),
    LateralNavbarComponent,
    NavbarTopComponent
  ],
  providers: [RequestInterceptorProvider,ResponseInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
