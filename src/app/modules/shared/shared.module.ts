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
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {PaymentMethodComponent} from './components/payment-method/payment-method.component';
import {PaymentHistoryComponent} from './components/payment-history/payment-history.component';
import {BillingCardComponent} from "./components/billing-card/billing-card.component";
import {HoverElevationDirective} from './directives/hover-elevation.directive';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { UnitSnapshotComponent } from './components/unit-snapshot/unit-snapshot.component';


@NgModule({
  declarations: [
    UnitPreviewComponent,
    SidebarComponent,
    UnitsGridComponent,
    LoadingShadeComponent,
    UnitIndicatorComponent,
    AccessHistoryComponent,
    UnitChartComponent,
    PaymentMethodComponent,
    PaymentHistoryComponent,
    BillingCardComponent,
    HoverElevationDirective,
    ToggleButtonComponent,
    UnitSnapshotComponent
  ],
  exports: [
    SidebarComponent,
    UnitsGridComponent,
    AccessHistoryComponent,
    UnitPreviewComponent,
    UnitChartComponent,
    UnitIndicatorComponent,
    PaymentMethodComponent,
    BillingCardComponent,
    HoverElevationDirective
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
    LineChartModule,
    MatSlideToggleModule,
    FormsModule
  ]
})
export class SharedModule {
}
