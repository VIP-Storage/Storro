import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminBaseComponent} from './admin-base/admin-base.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./admin-pages/admin-pages.module').then(m => m.AdminPagesModule)
  }
];

@NgModule({
  declarations: [
    AdminBaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    SharedModule,
  ]
})
export class AdminModule {
}
