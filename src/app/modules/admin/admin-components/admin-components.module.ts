import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from './stat-card/stat-card.component';
import { StatCardGridComponent } from './stat-card-grid/stat-card-grid.component';
import {SharedModule} from "../../shared/shared.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    StatCardComponent,
    StatCardGridComponent
  ],
  exports: [
    StatCardGridComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        MatGridListModule,
        MatIconModule
    ]
})
export class AdminComponentsModule { }
