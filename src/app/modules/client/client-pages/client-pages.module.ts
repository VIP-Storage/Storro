import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientDashboardComponent} from './client-dashboard/client-dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {ClientUnitComponent} from './client-unit/client-unit.component';
import {UnitResolver} from "../unit.resolver";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {ClientBillingComponent} from './client-billing/client-billing.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {UnitModule} from "../../shared/unit/unit.module";
import {BillingModule} from "../../shared/billing/billing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
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
  },
  {
    path: 'billing',
    component: ClientBillingComponent
  }
];

@NgModule({
  declarations: [
    ClientDashboardComponent,
    ClientUnitComponent,
    ClientBillingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    UnitModule,
    BillingModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    RouterModule
  ]
})
export class ClientPagesModule {
}
