import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientDashboardComponent} from './client-dashboard/client-dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {ClientUnitComponent} from './client-unit/client-unit.component';
import {UnitResolver} from "../unit.resolver";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";


const routes: Routes = [
  {
    path: 'dashboard',
    component: ClientDashboardComponent
  },
  {
    path: 'unit/:id',
    component: ClientUnitComponent,
    resolve: {
      unit: UnitResolver
    }
  }
];

@NgModule({
  declarations: [
    ClientDashboardComponent,
    ClientUnitComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    RouterModule
  ]
})
export class ClientPagesModule {
}
