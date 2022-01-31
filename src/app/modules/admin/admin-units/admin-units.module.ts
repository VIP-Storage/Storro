import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminUnitsComponent} from "./pages/admin-units/admin-units.component";
import {AdminUnitsMapComponent} from "./pages/admin-units-map/admin-units-map.component";
import {AdminImportUnitsComponent} from "./pages/admin-import-units/admin-import-units.component";
import {UnitOverviewComponent} from "../../shared/unit/pages/unit-overview/unit-overview.component";
import {UnitResolver} from "../resolvers";
import {UnitFullChartComponent} from "../../shared/unit/pages/unit-full-chart/unit-full-chart.component";
import {UnitChartResolver} from "../../shared/unit/resolvers/unit-chart.resolver";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {SharedModule} from "../../shared/shared.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AdminUnitComponent} from "./pages/admin-unit/admin-unit.component";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatGridListModule} from "@angular/material/grid-list";
import {AccessModule} from "../../shared/access/access.module";
import {UnitModule} from "../../shared/unit/unit.module";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatTreeModule} from "@angular/material/tree";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { AdminSideUnitSummaryComponent } from './components/admin-side-unit-summary/admin-side-unit-summary.component';


const routes: Routes = [
  {
    path: '',
    component: AdminUnitsComponent
  },
  {
    path: 'map',
    component: AdminUnitsMapComponent
  },
  {
    path: 'import',
    component: AdminImportUnitsComponent
  },
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
    AdminUnitsComponent,
    AdminUnitComponent,
    AdminUnitsMapComponent,
    AdminImportUnitsComponent,
    AdminSideUnitSummaryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatListModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule,
    MatGridListModule,
    AccessModule,
    UnitModule,
    NgxDropzoneModule,
    MatTreeModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class AdminUnitsModule { }
