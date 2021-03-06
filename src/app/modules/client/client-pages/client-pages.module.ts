import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientDashboardComponent} from './client-dashboard/client-dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
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
import {UnitChartResolver} from "../../shared/unit/resolvers/unit-chart.resolver";
import {UnitResolver} from "../resolvers/unit.resolver";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {BillingResolver} from "../resolvers/billing.resolver";
import {NgxStripeModule} from "ngx-stripe";
import {MatDialogModule} from "@angular/material/dialog";
import {AccountModule} from "../../shared/account/account.module";
import {UnitOverviewComponent} from "../../shared/unit/pages/unit-overview/unit-overview.component";
import {UnitFullChartComponent} from "../../shared/unit/pages/unit-full-chart/unit-full-chart.component";


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
    component: UnitOverviewComponent,
    resolve: {
      unit: UnitResolver
    },
    data: {
      mode: 'USER'
    }
  },
  {
    path: 'unit/:id/chart/:type',
    component: UnitFullChartComponent,
    resolve: {
      unit: UnitResolver,
      type: UnitChartResolver
    },
    data: {
      mode: 'USER'
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
];

@NgModule({
  declarations: [
    ClientDashboardComponent,
    ClientBillingComponent,
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
    MatDialogModule,
    AccountModule
  ],
  exports: [
    RouterModule
  ]
})
export class ClientPagesModule {
}
