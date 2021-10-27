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
import { SimpleTableComponent } from './components/simple-table/simple-table.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSortModule} from "@angular/material/sort";
import { SimpleTableRowComponent } from './components/simple-table-row/simple-table-row.component';


@NgModule({
  declarations: [
    SidebarComponent,
    LoadingShadeComponent,
    HoverElevationDirective,
    ToggleButtonComponent,
    SimpleTableComponent,
    SimpleTableRowComponent,
  ],
  exports: [
    SidebarComponent,
    HoverElevationDirective,
    ToggleButtonComponent,
    LoadingShadeComponent,
    SimpleTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSortModule
  ]
})
export class SharedModule {
}
