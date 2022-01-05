import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientBaseComponent} from "./modules/client/client-base/client-base.component";
import {AuthBaseComponent} from "./modules/auth/auth-base/auth-base.component";
import {AuthGuard} from "./modules/shared/guards/auth.guard";

const routes: Routes = [
  {
    path: 'client',
    component: ClientBaseComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'auth',
    component: AuthBaseComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'client'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
