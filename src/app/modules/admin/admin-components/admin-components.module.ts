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
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {GlobalSearchComponent} from './global-search/global-search.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {GlobalSearchResultComponent} from './global-search-result/global-search-result.component';


@NgModule({
  declarations: [
    StatCardComponent,
    StatCardGridComponent,
    ActionCardGridComponent,
    ActionCardComponent,
    GlobalSearchComponent,
    GlobalSearchResultComponent
  ],
  exports: [
    StatCardGridComponent,
    ActionCardGridComponent,
    GlobalSearchComponent
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
    ReactiveFormsModule,
    MatAutocompleteModule
  ]
})
export class AdminComponentsModule {
}
