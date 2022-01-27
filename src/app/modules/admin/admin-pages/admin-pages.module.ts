import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminTenantsComponent} from './admin-tenants/admin-tenants.component';
import {AdminUnitsComponent} from './admin-units/admin-units.component';
import {RouterModule, Routes} from "@angular/router";
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AdminUnitsMapComponent} from './admin-units-map/admin-units-map.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {AdminAccountsComponent} from './admin-accounts/admin-accounts.component';
import {AdminAccountComponent} from './admin-account/admin-account.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {AccountModule} from "../../shared/account/account.module";
import {AdminImportUnitsComponent} from './admin-import-units/admin-import-units.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatTreeModule} from "@angular/material/tree";
import {AdminComponentsModule} from "../admin-components/admin-components.module";
import { AdminUnitComponent } from './admin-unit/admin-unit.component';
import {UnitModule} from "../../shared/unit/unit.module";
import {AccessModule} from "../../shared/access/access.module";
import {UnitOverviewComponent} from "../../shared/unit/pages/unit-overview/unit-overview.component";
import {UnitFullChartComponent} from "../../shared/unit/pages/unit-full-chart/unit-full-chart.component";
import {UnitChartResolver} from "../../shared/unit/resolvers/unit-chart.resolver";
import {AccountResolver, UnitResolver} from "../resolvers";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'units',
    component: AdminUnitsComponent
  },
  {
    path: 'units/map',
    component: AdminUnitsMapComponent
  },
  {
    path: 'units/import',
    component: AdminImportUnitsComponent
  },
  {
    path: 'users',
    component: AdminUsersComponent,
  },
  {
    path: 'tenants',
    component: AdminTenantsComponent
  },
  {
    path: 'accounts',
    component: AdminAccountsComponent
  },
  {
    path: 'accounts/create',
    component: AdminAccountComponent
  },
  {
    path: 'accounts/:id',
    component: AdminAccountComponent,
    resolve: {
      account: AccountResolver
    }
  },
  {
    path: 'units/:id',
    component: UnitOverviewComponent,
    resolve: {
      unit: UnitResolver,
    },
    data: {
      mode: 'ADMIN'
    }
  },
  {
    path: 'units/:id/chart/:type',
    component: UnitFullChartComponent,
    resolve: {
      unit: UnitResolver,
      type: UnitChartResolver
    },
    data: {
      mode: 'ADMIN'
    }
  },
  {
    path: 'units/:id/chart',
    redirectTo: 'unit/:id'
  },
  {
    path: 'client/dashboard',
    redirectTo: 'units'
  }
]

@NgModule({
  declarations: [
    AdminTenantsComponent,
    AdminUnitsComponent,
    AdminDashboardComponent,
    AdminUnitsMapComponent,
    AdminUsersComponent,
    AdminAccountsComponent,
    AdminAccountComponent,
    AdminImportUnitsComponent,
    AdminUnitComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatGridListModule,
    AccountModule,
    NgxDropzoneModule,
    MatTreeModule,
    AdminComponentsModule,
    UnitModule,
    AccessModule,
  ]
})
export class AdminPagesModule {
}
