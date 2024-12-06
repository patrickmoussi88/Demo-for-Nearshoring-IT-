import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmptyRouteComponent} from "./empty-route/empty-route.component";
import {loadRemoteModule} from "@angular-architects/module-federation";

const routes: Routes = [
  {path: '#/plan-action', component: EmptyRouteComponent},
  {
    path: '',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'https://localhost/4201/remoteEntry.js',
        exposedModule: './ControleInterne'
      })
        .then(m => m.DashbordControleInterneComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
