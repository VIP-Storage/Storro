import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminUnitSettingsComponent} from './pages/admin-unit-settings/admin-unit-settings.component';
import {RouterModule, Routes} from "@angular/router";
import {UnitResolver} from "../resolvers";
import {UnitOverviewComponent} from "../../shared/unit/pages/unit-overview/unit-overview.component";
import {AdminUnitComponent} from "./pages/admin-unit/admin-unit.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SharedModule} from "../../shared/shared.module";
import {UnitModule} from "../../shared/unit/unit.module";
import {AccessModule} from "../../shared/access/access.module";
import {UnitFullChartComponent} from "../../shared/unit/pages/unit-full-chart/unit-full-chart.component";
import {UnitChartResolver} from "../../shared/unit/resolvers/unit-chart.resolver";
import {MatListModule} from "@angular/material/list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AdminComponentsModule} from "../admin-components/admin-components.module";
import { AdminUnitMonitorComponent } from './pages/admin-unit-monitor/admin-unit-monitor.component';

const routes: Routes = [
  {
    path: ':id',
    component: UnitOverviewComponent,
    resolve: {
      unit: UnitResolver,
    },
    data: {
      mode: 'ADMIN'
    }
  },
  {
    path: ':id/settings',
    resolve: {
      unit: UnitResolver
    },
    component: AdminUnitSettingsComponent
  },
  {
    path: ':id/settings/monitor',
    resolve: {
      unit: UnitResolver
    },
    component: AdminUnitMonitorComponent
  },
  {
    path: ':id/chart/:type',
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
    path: ':id/chart',
    redirectTo: ':id'
  },
]

@NgModule({
  declarations: [
    AdminUnitSettingsComponent,
    AdminUnitComponent,
    AdminUnitMonitorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatTooltipModule,
    SharedModule,
    UnitModule,
    AccessModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    AdminComponentsModule
  ]
})
export class AdminUnitModule {
}
