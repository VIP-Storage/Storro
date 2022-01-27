import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PageTitleService} from "../../../../services/page-title.service";
import {storroAnimations} from "../../../shared/animations";
import {BillingService} from "../../../../api/backend/services/billing.service";
import {BehaviorSubject} from "rxjs";
import {BillingHistoryType, PaymentMethod} from "../../../../data/types";
import {MatDrawer} from "@angular/material/sidenav";
import {map, tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {
  AddPaymentMethodComponent
} from "../../../shared/billing/components/add-payment-method/add-payment-method.component";

@Component({
  selector: 'app-client-billing',
  templateUrl: './client-billing.component.html',
  styleUrls: ['./client-billing.component.scss'],
  animations: storroAnimations
})
export class ClientBillingComponent implements OnInit, AfterViewInit {

  @ViewChild(MatDrawer) drawer?: MatDrawer;

  lastPaymentError: string|null = null;
  nextPaymentError: string|null = null;
  lastPayment: BillingHistoryType|null = null;
  nextPayment: BillingHistoryType|null = null;
  totalPaymentMethods: number = 0;
  paymentMethods = new BehaviorSubject<PaymentMethod[]>([])

  constructor(private pageTitleService: PageTitleService,
              private billingService: BillingService,
              public dialog: MatDialog) {

    this.billingService.getLastPayment().pipe(
      map(response => {
        if (response.success) {
          this.lastPaymentError = null;
          return response.data
        } else {
          this.lastPaymentError = 'No payments made';
        }

        return null;
      })
    ).subscribe(data => this.lastPayment = data);

    this.billingService.getNextPayment().pipe(
      map(response => {
        if (response.success) {
          this.nextPaymentError = null;
          return response.data
        } else {
          this.nextPaymentError = 'No payments scheduled';
        }

        return null;
      })
    ).subscribe(data => this.nextPayment = data);


    this.updatePaymentMethods();
  }

  ngOnInit(): void {
    this.pageTitleService.title = 'Billing';
  }

  addPaymentMethod() {
    let dialogRef = this.dialog.open(AddPaymentMethodComponent, {
      height: '400px',
      width: '600px',
      panelClass: 'add-payment-method-dialog'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updatePaymentMethods();
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.drawer?.open();
    }, 450);
  }

  deletePaymentMethod(id: string) {
    this.billingService.deletePaymentMethod(id).subscribe(() => {
      this.updatePaymentMethods();
    })
  }

  onTitle(formattedDate: string|null) {
    return `on ${formattedDate}`;
  }

  atTitle(formattedDate: string|null) {
    return `on ${formattedDate}`;
  }

  private updatePaymentMethods() {
    this.billingService.getPaymentMethods().pipe(
      tap(paymentMethods => {
        this.totalPaymentMethods = paymentMethods.length;
      })
    ).subscribe(methods => {
      this.paymentMethods.next(methods);
    })
  }

}
