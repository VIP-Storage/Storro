import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StripeCardElementChangeEvent, StripeCardElementOptions, StripeElementsOptions} from "@stripe/stripe-js";
import {MatDialogRef} from "@angular/material/dialog";
import {StripeCardComponent, StripeService} from "ngx-stripe";
import {storroAnimations} from "../../../animations";
import {switchMap} from "rxjs/operators";
import {BillingService} from "../../../../../api/backend/services/billing.service";
import {of} from "rxjs";
import {UserService} from "../../../../../api/backend/services/user.service";

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss'],
  animations: storroAnimations
})
export class AddPaymentMethodComponent {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardError: string | null = null;
  error: string | null = null;
  name = new FormControl('', [Validators.required]);
  cardValid = false;
  submitted = false;

  addPaymentMethodForm: FormGroup = new FormGroup({
    name: this.name,
  });

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  constructor(private dialogRef: MatDialogRef<AddPaymentMethodComponent>,
              private billingService: BillingService,
              private userService: UserService,
              private stripeService: StripeService) {
  }


  addPaymentMethod() {
    this.submitted = true;

    const paymentMethodName = this.name.value;

    this.userService.currentUser.pipe(
      switchMap(user => {
        return this.stripeService.createToken(this.card.element, {
          name: `${user.firstName} ${user.lastName}`,
        })
      })
    )

    this.stripeService
      .createToken(this.card.element, {

      })
      .pipe(
        switchMap(result => {
          if (result.token) {
            return this.billingService.createPaymentMethod(result.token, paymentMethodName);
          } else if (result.error?.message) {
            this.cardError = result.error.message;
          }

          return of(null);
        })
      )
      .subscribe((result) => {
        if (result !== null) {
          this.dialogRef.close(result)
        } else {
          this.submitted = false;
        }
      });
  }

  cardChanges(changes: StripeCardElementChangeEvent) {
    this.cardValid = changes.complete;

    if (!!changes.error) {
      this.cardError = changes.error.message;
    } else {
      this.cardError = null;
    }
  }

  getNameError() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  get disableSubmit() {
    return this.name.invalid || !this.cardValid || this.submitted;
  }

}
