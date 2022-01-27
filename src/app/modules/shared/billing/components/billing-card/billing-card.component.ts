import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core/common-behaviors/color";
import {PaymentMethod} from "../../../../../data/types";
import {storroAnimations} from "../../../animations";

@Component({
  selector: 'app-billing-card',
  templateUrl: './billing-card.component.html',
  styleUrls: ['./billing-card.component.scss'],
  animations: storroAnimations
})
export class BillingCardComponent implements OnInit {

  @Input()
  errorMessage: string|null = null;

  @Input()
  loading: boolean = false;

  @Input()
  title!: string;

  @Input()
  subtitle?: string;

  @Input()
  routerLink?: string;

  @Input()
  chargedTo?: PaymentMethod|null;

  @Input()
  actionTitle: string = 'Go to';

  @Input()
  @HostBinding('class.show-borders')
  showBorders: boolean = false;

  @Input()
  @HostBinding('class.show-background')
  showBackground: boolean = false;

  @Input()
  @HostBinding('class.mat-elevation-z3')
  showShadow: boolean = true;

  @Input()
  set amount(newValue: number | string | null | undefined) {
    if (newValue !== null && newValue !== undefined) {
      this._amount = Number(newValue);
    }
  }

  @Input()
  color: ThemePalette

  private _amount!: number;

  constructor() { }

  ngOnInit(): void {
  }

  get amountString(): string {
    return `${this._amount}`.replace('$', '');
  }

  get dollars(): string {
    return this.amountString.split('.')[0];
  }

  get cents(): string {
    return this.amountString.split('.')[1] || '00';
  }

  get chargedToMethod(): string | undefined {
    return this.chargedTo?.name;
  }
}
