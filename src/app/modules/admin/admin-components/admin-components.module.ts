import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatCardComponent} from './stat-card/stat-card.component';
import {StatCardGridComponent} from './stat-card-grid/stat-card-grid.component';
import {SharedModule} from "../../shared/shared.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {ActionCardGridComponent} from './action-card-grid/action-card-grid.component';
import {ActionCardComponent} from './action-card/action-card.component';
import {MatRippleModule} from "@angular/material/core";
import {MonitorListComponent} from "./monitor-list/monitor-list.component";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MonitorCreateComponent } from './monitor-create/monitor-create.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    StatCardComponent,
    StatCardGridComponent,
    ActionCardGridComponent,
    ActionCardComponent,
    MonitorListComponent,
    MonitorCreateComponent
  ],
  exports: [
    StatCardGridComponent,
    ActionCardGridComponent,
    MonitorListComponent,
    MonitorCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatRippleModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class AdminComponentsModule {
}
