import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitIndicatorComponent} from './components/unit-indicator/unit-indicator.component';
import {UnitPreviewComponent} from './components/unit-preview/unit-preview.component';
import {UnitChartComponent} from './components/unit-chart/unit-chart.component';
import {UnitSnapshotComponent} from './components/unit-snapshot/unit-snapshot.component';
import {UnitsGridComponent} from './components/units-grid/units-grid.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatBadgeModule} from "@angular/material/badge";
import {MatRippleModule} from "@angular/material/core";
import {SharedModule} from "../shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {RouterModule} from "@angular/router";
import {UnitMapCardComponent} from './components/unit-map-card/unit-map-card.component';
import {UnitOverviewComponent} from './pages/unit-overview/unit-overview.component';
import {AccessModule} from "../access/access.module";
import {UnitFullChartComponent} from './pages/unit-full-chart/unit-full-chart.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    UnitIndicatorComponent,
    UnitPreviewComponent,
    UnitChartComponent,
    UnitSnapshotComponent,
    UnitsGridComponent,
    UnitMapCardComponent,
    UnitOverviewComponent,
    UnitFullChartComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatRippleModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    NgxChartsModule,
    RouterModule,
    AccessModule,
    MatToolbarModule,
    MatDividerModule
  ],
  exports: [
    UnitIndicatorComponent,
    UnitPreviewComponent,
    UnitChartComponent,
    UnitSnapshotComponent,
    UnitsGridComponent,
    UnitMapCardComponent,
  ]
})
export class UnitModule {
}
