import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { ClientBaseComponent } from './client-base/client-base.component';
import {UnitModule} from "../shared/unit/unit.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./client-pages/client-pages.module').then(m => m.ClientPagesModule)
  }
];

@NgModule({
  declarations: [
    ClientBaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UnitModule,
    MatSidenavModule,
    SharedModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class ClientModule {
}
