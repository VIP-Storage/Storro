import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientDashboardComponent} from './client-dashboard/client-dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {ClientUnitComponent} from './client-unit/client-unit.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {ClientBillingComponent} from './client-billing/client-billing.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {UnitModule} from "../../shared/unit/unit.module";
import {BillingModule} from "../../shared/billing/billing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AccessModule} from "../../shared/access/access.module";
import {ClientUnitChartComponent} from './client-unit-chart/client-unit-chart.component';
import {UnitChartResolver} from "../resolvers/unit-chart.resolver";
import {UnitResolver} from "../resolvers/unit.resolver";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {ClientBillingSetupComponent} from './client-billing-setup/client-billing-setup.component';
import {BillingResolver} from "../resolvers/billing.resolver";
import {NgxStripeModule} from "ngx-stripe";
import {MatDialogModule} from "@angular/material/dialog";


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
    path: 'unit/:id/chart/:type',
    component: ClientUnitChartComponent,
    resolve: {
      unit: UnitResolver,
      type: UnitChartResolver
    }
  },
  {
    path: 'unit/:id/chart',
    redirectTo: 'unit/:id'
  },
  {
    path: 'billing',
    component: ClientBillingComponent,
    resolve: {
      customer: BillingResolver
    }
  },
  {
    path: 'billing/setup',
    component: ClientBillingSetupComponent
  }
];

@NgModule({
  declarations: [
    ClientDashboardComponent,
    ClientUnitComponent,
    ClientBillingComponent,
    ClientUnitChartComponent,
    ClientBillingSetupComponent
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
    AccessModule,
    MatToolbarModule,
    MatDividerModule,
    NgxStripeModule,
    MatDialogModule
  ],
  exports: [
    RouterModule
  ]
})
export class ClientPagesModule {
}
