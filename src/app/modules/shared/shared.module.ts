import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitPreviewComponent} from './components/unit-preview/unit-preview.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MatListModule} from "@angular/material/list";
import {MatLineModule, MatRippleModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {UnitsGridComponent} from './components/units-grid/units-grid.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {LoadingShadeComponent} from './components/loading-shade/loading-shade.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {UnitIndicatorComponent} from './components/unit-indicator/unit-indicator.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AccessHistoryComponent} from './components/access-history/access-history.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UnitChartComponent} from './components/unit-chart/unit-chart.component';
import {LineChartModule} from "@swimlane/ngx-charts";


@NgModule({
  declarations: [
    UnitPreviewComponent,
    SidebarComponent,
    UnitsGridComponent,
    LoadingShadeComponent,
    UnitIndicatorComponent,
    AccessHistoryComponent,
    UnitChartComponent,
  ],
  exports: [
    SidebarComponent,
    UnitsGridComponent,
    AccessHistoryComponent,
    UnitPreviewComponent,
    UnitChartComponent,
    UnitIndicatorComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatLineModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatRippleModule,
    MatBadgeModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    LineChartModule
  ]
})
export class SharedModule {
}
