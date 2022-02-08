import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from './stat-card/stat-card.component';
import { StatCardGridComponent } from './stat-card-grid/stat-card-grid.component';
import {SharedModule} from "../../shared/shared.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import { ActionCardGridComponent } from './action-card-grid/action-card-grid.component';
import { ActionCardComponent } from './action-card/action-card.component';
import {MatRippleModule} from "@angular/material/core";



@NgModule({
  declarations: [
    StatCardComponent,
    StatCardGridComponent,
    ActionCardGridComponent,
    ActionCardComponent
  ],
    exports: [
        StatCardGridComponent,
        ActionCardGridComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatRippleModule
  ]
})
export class AdminComponentsModule { }
