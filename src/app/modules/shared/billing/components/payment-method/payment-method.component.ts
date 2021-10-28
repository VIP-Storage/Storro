import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {PaymentMethodType} from "../../../../../data/enums";

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  @Input()
  title?: string;

  @Input()
  type: PaymentMethodType = PaymentMethodType.VISA;

  @Input()
  @HostBinding('class.current')
  current: boolean = true;

  @Input()
  identifier?: string;

  @Input()
  expiry?: string;

  constructor() { }

  ngOnInit(): void {
  }

  get typeImage(): string {
    return `assets/payment/${this.type.toLowerCase()}.svg`;
  }

  get isCreditCard(): boolean {
    return this.type !== PaymentMethodType.BTC && this.type !== PaymentMethodType.PAYPAL;
  }

}
