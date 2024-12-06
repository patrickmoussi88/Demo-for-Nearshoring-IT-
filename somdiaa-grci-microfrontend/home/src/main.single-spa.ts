import {enableProdMode, importProvidersFrom, NgZone} from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Router, NavigationStart, provideRouter, RouterModule} from '@angular/router';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';


import { AppModule } from './app/app.module';
//import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {APP_BASE_HREF} from "@angular/common";
import {HomePageComponent} from "./app/home-page/home-page.component";
import {LoginComponent} from "./app/component/authentification/login/login.component";
import {WelcomeComponent} from "./app/welcome/welcome.component";
import {withInterceptors} from "@angular/common/http";
import {ResponseInterceptorProvider} from "./app/interceptors/response.interceptor";

//enableProdMode();


const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
      return bootstrapApplication(AppComponent, {
          providers: [
              getSingleSpaExtraProviders(),
              importProvidersFrom(AppModule),


             // importProvidersFrom(RouterModule.forRoot(routes)),
             { provide: APP_BASE_HREF, useValue: '/' },
          ],
      });
  },
  template: '<app-home />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
