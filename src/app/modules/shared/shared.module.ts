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
  ],
  exports: [
    SidebarComponent,
    HoverElevationDirective,
    ToggleButtonComponent,
    LoadingShadeComponent,
    SimpleTableComponent,
    CustomColorDirective,
    UnitMapComponent
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
  ],
  providers: [
    HttpClient
  ]
})
export class SharedModule {
}
