import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavHomeComponent } from './home-page/home-page-components/nav-home/nav-home.component';
import { AboutComponent } from './home-page/home-page-components/about/about.component';
import { ModsComponent } from './home-page/home-page-components/mods/mods.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { LoginComponent } from './component/authentification/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavWelcomeComponent } from './welcome/welcome-components/nav-welcome/nav-welcome.component';
import { LogoSomdiaaComponent } from './common-components/logo-somdiaa/logo-somdiaa.component';
import { LanguageComponent } from './common-components/language/language.component';
import { FeaturesComponent } from './welcome/welcome-components/features/features.component';
import {AssertUrl} from "./pipes/assert-url";
import {ModuleLinkPipe} from "./pipes/module-link-pipe";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LogoutComponent } from './component/authentification/logout/logout.component';
import { ForgotpasswordComponent } from './component/authentification/reset/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './component/authentification/reset/resetpassword/resetpassword.component';
import { RequestInterceptorProvider} from "./interceptors/request.interceptor";
import { ResponseInterceptorProvider} from "./interceptors/response.interceptor";
import { AuthorizeDirective } from './directive/authorize.directive';


@NgModule({
    declarations: [
        HomePageComponent,
        NavHomeComponent,
        AboutComponent,
        ModsComponent,
        FooterComponent,
        LoginComponent,
        WelcomeComponent,
        NavWelcomeComponent,
        LogoSomdiaaComponent,
        LanguageComponent,
        FeaturesComponent,
        AssertUrl,
        ModuleLinkPipe,
        LogoutComponent,
        ForgotpasswordComponent,
        ResetpasswordComponent,
        AuthorizeDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [RequestInterceptorProvider, ResponseInterceptorProvider],
    exports: [
        AssertUrl
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
