import {Component, OnInit} from '@angular/core';
import {StripeCardElementOptions, StripeElementsOptions} from "@stripe/stripe-js";

@Component({
  selector: 'app-client-billing-setup',
  templateUrl: './client-billing-setup.component.html',
  styleUrls: ['./client-billing-setup.component.scss']
})
export class ClientBillingSetupComponent implements OnInit {



  constructor() {
  }

  ngOnInit(): void {
  }

}
