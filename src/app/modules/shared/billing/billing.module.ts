import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BillingHistoryComponent} from './components/billing-history/billing-history.component';
import {PaymentMethodComponent} from './components/payment-method/payment-method.component';
import {BillingCardComponent} from "./components/billing-card/billing-card.component";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    PaymentMethodComponent,
    BillingCardComponent,
    BillingHistoryComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    PaymentMethodComponent,
    BillingCardComponent,
    BillingHistoryComponent
  ]
})
export class BillingModule {
}
