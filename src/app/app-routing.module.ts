import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientBaseComponent} from "./modules/client/client-base/client-base.component";
import {AuthBaseComponent} from "./modules/auth/auth-base/auth-base.component";
import {AuthGuard} from "./modules/shared/guards/auth.guard";
import {RoleGuard} from "./modules/shared/guards/role.guard";
import {AdminBaseComponent} from "./modules/admin/admin-base/admin-base.component";

const routes: Routes = [
  {
    path: 'client',
    component: ClientBaseComponent,
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule),
    data: { breadcrumb: { skip: true } }
  },
  {
    path: 'auth',
    component: AuthBaseComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    data: { breadcrumb: { skip: true } }
  },
  {
    path: 'admin',
    component: AdminBaseComponent,
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    data: { breadcrumb: { skip: true } }
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
