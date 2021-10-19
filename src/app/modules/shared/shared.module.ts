import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitPreviewComponent } from './components/unit-preview/unit-preview.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatListModule} from "@angular/material/list";
import {MatLineModule, MatRippleModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import { UnitsGridComponent } from './components/units-grid/units-grid.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { LoadingShadeComponent } from './components/loading-shade/loading-shade.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import { UnitIndicatorComponent } from './components/unit-indicator/unit-indicator.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    UnitPreviewComponent,
    SidebarComponent,
    UnitsGridComponent,
    LoadingShadeComponent,
    UnitIndicatorComponent,
  ],
  exports: [
    SidebarComponent,
    UnitsGridComponent
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
    MatTooltipModule
  ]
})
export class SharedModule { }
