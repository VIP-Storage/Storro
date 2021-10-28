import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {AccessCardComponent} from './components/access-card/access-card.component';
import {AccessHistoryComponent} from './components/access-history/access-history.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    AccessCardComponent,
    AccessHistoryComponent
  ],
  exports: [
    AccessCardComponent,
    AccessHistoryComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatGridListModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class AccessModule {
}
