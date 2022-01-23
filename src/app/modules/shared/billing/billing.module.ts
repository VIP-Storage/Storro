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
import { AddPaymentMethodComponent } from './components/add-payment-method/add-payment-method.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NgxStripeModule} from "ngx-stripe";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    PaymentMethodComponent,
    BillingCardComponent,
    BillingHistoryComponent,
    AddPaymentMethodComponent
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
        MatTooltipModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NgxStripeModule,
        MatToolbarModule,
        MatDividerModule,
        MatProgressSpinnerModule
    ],
  exports: [
    PaymentMethodComponent,
    BillingCardComponent,
    BillingHistoryComponent,
    AddPaymentMethodComponent
  ]
})
export class BillingModule {
}
