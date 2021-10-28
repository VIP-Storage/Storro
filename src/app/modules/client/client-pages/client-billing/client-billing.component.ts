import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PageTitleService} from "../../../../services/page-title.service";
import {storroAnimations} from "../../../shared/animations";
import {BillingService} from "../../../../api/backend/services/billing.service";
import {Observable} from "rxjs";
import {PaymentMethod} from "../../../../data/types";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-client-billing',
  templateUrl: './client-billing.component.html',
  styleUrls: ['./client-billing.component.scss'],
  animations: storroAnimations
})
export class ClientBillingComponent implements OnInit, AfterViewInit {

  @ViewChild(MatDrawer) drawer?: MatDrawer;

  paymentMethods: Observable<PaymentMethod[]>;
  paymentMethodCurrent: Observable<PaymentMethod|undefined>;

  constructor(private pageTitleService: PageTitleService,
              private billingService: BillingService) {

    this.paymentMethods = this.billingService.getPaymentMethods();
    this.paymentMethodCurrent = this.billingService.getCurrentPaymentMethod();
  }

  ngOnInit(): void {
    this.pageTitleService.title = 'Billing';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.drawer?.open();
    }, 450);
  }

}
