import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {PaymentMethodType} from "../../../../../data/enums";

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent {

  @Input()
  title?: string;

  @Input()
  type?: string;

  @Input()
  @HostBinding('class.current')
  current: boolean = false;

  @Input()
  identifier?: string;

  @Input()
  expiry?: string;

  @Output()
  deleteClicked = new EventEmitter<boolean>();

  get typeImage(): string {
    return `assets/payment/${this.type!.toLowerCase()}.svg`;
  }

  get isCreditCard(): boolean {
    return this.type !== PaymentMethodType.BTC && this.type !== PaymentMethodType.PAYPAL;
  }

}
