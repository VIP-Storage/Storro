import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitIndicatorComponent} from './components/unit-indicator/unit-indicator.component';
import {UnitPreviewComponent} from './components/unit-preview/unit-preview.component';
import {UnitChartComponent} from './components/unit-chart/unit-chart.component';
import {UnitSnapshotComponent} from './components/unit-snapshot/unit-snapshot.component';
import {UnitsGridComponent} from './components/units-grid/units-grid.component';
import {AccessHistoryComponent} from './components/access-history/access-history.component';
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
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    UnitIndicatorComponent,
    UnitPreviewComponent,
    UnitChartComponent,
    UnitSnapshotComponent,
    UnitsGridComponent,
    AccessHistoryComponent,
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
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    UnitIndicatorComponent,
    UnitPreviewComponent,
    UnitChartComponent,
    UnitSnapshotComponent,
    AccessHistoryComponent,
    UnitsGridComponent,
  ]
})
export class UnitModule {
}
