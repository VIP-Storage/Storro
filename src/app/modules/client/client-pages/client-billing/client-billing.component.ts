import {Component, OnInit} from '@angular/core';
import {PageTitleService} from "../../../../services/page-title.service";
import {storroAnimations} from "../../../shared/animations";
import {BillingService} from "../../../../api/backend/services/billing.service";
import {Observable} from "rxjs";
import {PaymentMethod} from "../../../../data/types";

@Component({
  selector: 'app-client-billing',
  templateUrl: './client-billing.component.html',
  styleUrls: ['./client-billing.component.scss'],
  animations: storroAnimations
})
export class ClientBillingComponent implements OnInit {

  paymentMethods: Observable<PaymentMethod[]>;

  constructor(private pageTitleService: PageTitleService,
              private billingService: BillingService) {

    this.paymentMethods = this.billingService.getPaymentMethods();
  }

  ngOnInit(): void {
    this.pageTitleService.title = 'Billing';
  }

}
