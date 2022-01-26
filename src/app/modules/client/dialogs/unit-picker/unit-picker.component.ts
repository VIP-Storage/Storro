import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {PaymentMethod, UnitByType} from "../../../../data/types";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {MatSelectionListChange} from "@angular/material/list";
import {storroAnimations} from "../../../shared/animations";
import {CurrencyPipe} from "@angular/common";
import {tap} from "rxjs/operators";
import {BillingService} from "../../../../api/backend/services/billing.service";
import {MatDialog} from "@angular/material/dialog";
import {
  AddPaymentMethodComponent
} from "../../../shared/billing/components/add-payment-method/add-payment-method.component";

@Component({
  selector: 'app-unit-picker',
  templateUrl: './unit-picker.component.html',
  styleUrls: ['./unit-picker.component.scss'],
  animations: storroAnimations
})
export class UnitPickerComponent {

  submitted: boolean = false;
  userAcceptedAgreement: boolean = false;
  selectedType: string|null = null;
  selectedPaymentMethod: string|null = null;

  unitsByType: Observable<UnitByType[]>;
  isLoadingTypes: boolean = true;
  totalUnitTypes: number = 0;

  paymentMethods!: Observable<PaymentMethod[]>;
  isLoadingPaymentMethods: boolean = true;
  totalPaymentMethods: number = 0;

  static panelClass = 'unit-picker-dialog';

  private currencyPipe: CurrencyPipe = new CurrencyPipe('en');

  constructor(private unitsService: UnitsService,
              private matDialog: MatDialog,
              private billingService: BillingService) {
    this.unitsByType = this.unitsService.getAvailableUnitsByType().pipe(
      tap(() => this.isLoadingTypes = false),
      tap(types => this.totalUnitTypes = types.length)
    )

    this.reloadPaymentMethods();
  }

  typeSelectionChanged(selection: MatSelectionListChange) {
    this.selectedType = selection.options[0].value;
  }

  paymentMethodSelectionChange(selection: MatSelectionListChange) {
    this.selectedPaymentMethod = selection.options[0].value;
  }

  isSelected(entity: UnitByType | PaymentMethod) {
    if (entity.hasOwnProperty('unitType')) {
      return this.selectedType === (entity as UnitByType).unitType;
    }

    return this.selectedPaymentMethod === (entity as PaymentMethod).id;
  }

  addPaymentMethod() {
    this.matDialog.open(AddPaymentMethodComponent, {
      width: '600px',
      panelClass: 'add-payment-method-dialog'
    }).afterClosed().subscribe(response => {
      if (!!response) {
        this.reloadPaymentMethods();
      }
    })
  }

  getPricing(unitByType: UnitByType) {
    let billingInterval;

    switch (unitByType.billingInterval) {
      case 'day':
        billingInterval = 'daily';
        break;
      case 'week':
        billingInterval = 'weekly';
        break;
      case "year":
        billingInterval = 'yearly';
        break;
      default:
        billingInterval = 'monthly';
        break;
    }

    return `${this.currencyPipe.transform(unitByType.price)}, billed ${billingInterval}`;
  }

  get rentButtonDisabled() {
    return !this.userAcceptedAgreement || this.selectedPaymentMethod === null || this.selectedType === null || this.submitted;
  }

  private reloadPaymentMethods() {
    this.paymentMethods = this.billingService.getPaymentMethods().pipe(
      tap(() => this.isLoadingPaymentMethods = false),
      tap(paymentMethods => this.totalPaymentMethods = paymentMethods.length)
    )
  }
}
