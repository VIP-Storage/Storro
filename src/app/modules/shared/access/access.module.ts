import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {AccessCardComponent} from './components/access-card/access-card.component';
import {AccessHistoryCardComponent} from './components/access-history-card/access-history-card.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import {SharedModule} from "../shared.module";


@NgModule({
  declarations: [
    AccessCardComponent,
    AccessHistoryCardComponent
  ],
  exports: [
    AccessCardComponent,
    AccessHistoryCardComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatGridListModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    SharedModule
  ]
})
export class AccessModule {
}
