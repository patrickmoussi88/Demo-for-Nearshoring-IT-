import {enableProdMode, importProvidersFrom, NgZone} from '@angular/core';

//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Router, NavigationStart, provideRouter, RouterModule, withComponentInputBinding} from '@angular/router';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
import {TEMPLATE_ROUTES} from './app/app.routes'

//import { AppModule } from './app/app.module';
//import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import {bootstrapApplication} from "@angular/platform-browser";
import {APP_BASE_HREF} from "@angular/common";
import {AppComponent} from "./app/app.component";
import {provideHttpClient} from "@angular/common/http";
import {ResponseInterceptorProvider} from "./app/interceptors/response.interceptor";
import {RequestInterceptorProvider} from "./app/interceptors/request.interceptor";

/*if (environment.production) {
  enableProdMode();
}*/

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return bootstrapApplication(AppComponent, {
      providers: [
        getSingleSpaExtraProviders(),
        provideHttpClient(),
        ResponseInterceptorProvider,
        RequestInterceptorProvider,

        //importProvidersFrom(RouterModule.forRoot(TEMPLATE_ROUTES)),
        provideRouter(
          TEMPLATE_ROUTES,
          withComponentInputBinding()
        ),
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
    });
  },
  template: '<app-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
