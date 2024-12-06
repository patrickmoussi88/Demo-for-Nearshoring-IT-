import {NgModule} from '@angular/core';
//import {} from '@somdiaa-grci/incidents';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginComponent} from "./component/authentification/login/login.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {ForgotpasswordComponent} from "./component/authentification/reset/forgotpassword/forgotpassword.component";
import {ResetpasswordComponent} from "./component/authentification/reset/resetpassword/resetpassword.component";

 const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'home/authentication/login', component: LoginComponent},
    {path: 'home/authentication/welcome', component: WelcomeComponent},
    {path: 'home/authentication/reset/forgot-password', component: ForgotpasswordComponent},
     {path: 'home/authentication/reset/reset-password', component: ResetpasswordComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppRoutingModule {
}
