import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {StateHelper} from "../../../helpers/state.helper";
import {Account} from "../../../../../data/types";

@Component({
  selector: 'app-mailing-address-form',
  templateUrl: './mailing-address-form.component.html',
  styleUrls: ['./mailing-address-form.component.scss']
})
export class MailingAddressFormComponent {

  @Input()
  googleAvailable: boolean = false;

  mailingAddressFormGroup: FormGroup;
  allStates = StateHelper.states;

  // Address
  streetAddress = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  state = new FormControl('', [Validators.required]);
  zipCode = new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]);

  @Input()
  set account(account: Account | null) {
    if (!!account) {
      this.streetAddress.setValue(account.mailingAddress.streetAddress);
      this.city.setValue(account.mailingAddress.city);
      this.state.setValue(account.mailingAddress.state);
      this.zipCode.setValue(account.mailingAddress.zipCode);
    }
  }

  constructor() {
    this.mailingAddressFormGroup = new FormGroup({
      streetAddress: this.streetAddress,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode
    });
  }

  public addressChanged(address: Address) {
    const streetAddressComponents = {
      streetNumber: address.address_components.find(c => c.types[0] === "street_number"),
      streetName: address.address_components.find(c => c.types[0] === "route")
    };

    const cityComponent = address.address_components.find(c => c.types[0] === 'locality');
    const stateComponent = address.address_components.find(c => c.types[0] === 'administrative_area_level_1');
    const postalCodeComponent = address.address_components.find(c => c.types[0] === 'postal_code');

    if (!!streetAddressComponents.streetNumber && !!streetAddressComponents.streetName) {
      this.streetAddress.setValue(`${streetAddressComponents.streetNumber.long_name} ${streetAddressComponents.streetName.long_name}`);
    }

    if (!!cityComponent) {
      this.city.setValue(cityComponent.long_name);
    }

    if (!!stateComponent) {
      this.state.setValue(stateComponent.short_name);
    }

    if (!!postalCodeComponent) {
      this.zipCode.setValue(postalCodeComponent.long_name);
    }
  }

  getErrorMessage(formControl: FormControl, displayLabel?: string) {
    if (!formControl) {
      console.warn(`FormControl '${name}' is null or undefined`);
      return '';
    }

    const label = (displayLabel ? displayLabel : 'value');

    if (formControl.hasError('email')) {
      return `'${formControl.value}' is not a valid email address`;
    } else if (formControl.hasError('required')) {
      return `You must enter a ${label}`;
    } else if (formControl.hasError('minlength')) {
      return `'${formControl.value}' is too short of a ${label}`;
    } else if (formControl.hasError('mask')) {
      const requiredValue = formControl.getError('mask').requiredMask;

      return `'${formControl.value}' is not a valid ${label}, must be in format ${requiredValue}`;
    } else if (formControl.hasError('validateExpiration')) {
      return formControl.getError('validateExpiration').message;
    }

    return '';
  }

  get addressNextDisabled() {
    return this.streetAddress.invalid || this.city.invalid || this.state.invalid || this.zipCode.invalid;
  }

  get data() {
    return {
      streetAddress: this.streetAddress.value,
      city: this.city.value,
      state: this.state.value,
      zipCode: this.zipCode.value
    };
  }
}
