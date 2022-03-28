import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UnitResolver} from "../resolvers";
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
import {LayoutModule} from "../../layout/layout.module";
import {MatRippleModule} from "@angular/material/core";
import {EventsModule} from "../../shared/events/events.module";

const routes: Routes = [
  {
    path: ':id',
    component: AdminUnitComponent,
    resolve: {
      unit: UnitResolver,
    },
    data: {
      mode: 'ADMIN'
    },
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
    AdminUnitComponent,
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
        AdminComponentsModule,
        LayoutModule,
        MatRippleModule,
        EventsModule
    ]
})
export class AdminUnitModule {
}
