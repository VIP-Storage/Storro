import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {RouterModule} from "@angular/router";
import {LoadingShadeComponent} from './components/loading-shade/loading-shade.component';
import {FormsModule} from "@angular/forms";
import {HoverElevationDirective} from './directives/hover-elevation.directive';
import {ToggleButtonComponent} from './components/toggle-button/toggle-button.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatRippleModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SimpleTableComponent} from './components/simple-table/simple-table.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSortModule} from "@angular/material/sort";
import {SimpleTableRowComponent} from './components/simple-table-row/simple-table-row.component';
import {CustomColorDirective} from './directives/custom-color.directive';
import {UnitMapComponent} from './components/unit-map/unit-map.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MiniProfileComponent} from './components/mini-profile/mini-profile.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {SpinnerButtonComponent} from './components/spinner-button/spinner-button.component';
import {CircleButtonComponent} from './components/circle-button/circle-button.component';
import {SearchBarComponent} from "./components/search-bar/search-bar.component";
import {PageHeaderComponent} from './components/page-header/page-header.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {StatusBadgeComponent} from './components/status-badge/status-badge.component';
import {NoDataShadeComponent} from './components/no-data-shade/no-data-shade.component';
import {CopyClipboardDirective} from './directives/copy-clipboard.directive';
import {HighlightGlobalSearchPipe, RolePipe} from "./pipes";
import {DateInputDirective} from './directives/date-input.directive';
import {AlertWrapperComponent} from "./components/alert-wrapper/alert-wrapper.component";
import {MtxAlertModule} from "@ng-matero/extensions/alert";


@NgModule({
  declarations: [
    SidebarComponent,
    LoadingShadeComponent,
    HoverElevationDirective,
    ToggleButtonComponent,
    SimpleTableComponent,
    SimpleTableRowComponent,
    CustomColorDirective,
    UnitMapComponent,
    MiniProfileComponent,
    SpinnerButtonComponent,
    SpinnerButtonComponent,
    CircleButtonComponent,
    SearchBarComponent,
    RolePipe,
    PageHeaderComponent,
    StatusBadgeComponent,
    NoDataShadeComponent,
    CopyClipboardDirective,
    HighlightGlobalSearchPipe,
    DateInputDirective,
    AlertWrapperComponent,
  ],
  exports: [
    SidebarComponent,
    HoverElevationDirective,
    ToggleButtonComponent,
    LoadingShadeComponent,
    SimpleTableComponent,
    CustomColorDirective,
    UnitMapComponent,
    SpinnerButtonComponent,
    CircleButtonComponent,
    SearchBarComponent,
    RolePipe,
    PageHeaderComponent,
    StatusBadgeComponent,
    NoDataShadeComponent,
    CopyClipboardDirective,
    HighlightGlobalSearchPipe,
    DateInputDirective,
    AlertWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSortModule,
    LeafletModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MtxAlertModule,
  ],
  providers: [
    HttpClient
  ]
})
export class SharedModule {
}
