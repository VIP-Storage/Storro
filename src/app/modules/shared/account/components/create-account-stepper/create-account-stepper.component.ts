import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StateHelper} from "../../../helpers/state.helper";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {ExpirationValidator} from "../../validator/expiration.validator";
import {CreateAccountRequest} from "../../../../../data/requests/create-account.request";
import {AccountsService} from "../../../../../api/backend/services/accounts.service";
import {UserService} from "../../../../../api/backend/services/user.service";
import {Router} from "@angular/router";
import {storroAnimations} from "../../../animations";

@Component({
  selector: 'app-create-account-stepper',
  templateUrl: './create-account-stepper.component.html',
  styleUrls: ['./create-account-stepper.component.scss'],
  animations: storroAnimations
})
export class CreateAccountStepperComponent implements OnInit {


  @Input()
  googleAvailable: boolean = false;

  error: string|null = null;
  submitted: boolean = false;
  allStates = StateHelper.states;
  mailingAddressFormGroup: FormGroup;
  personalInformationFormGroup: FormGroup;
  emergencyContactFormGroup: FormGroup;

  // Address
  streetAddress = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  state = new FormControl('', [Validators.required]);
  zipCode = new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]);

  // Personal Information
  driversLicenseNumber = new FormControl('', [Validators.required]);
  driversLicenseState = new FormControl('', [Validators.required]);
  driversLicenseExpiration = new FormControl('', [Validators.required, ExpirationValidator.driversLicense]);
  dateOfBirth = new FormControl('', [Validators.required]);
  personalPhoneNumber = new FormControl('', [Validators.required]);

  // Emergency Contact
  fullName = new FormControl('', [Validators.required]);
  primaryPhone = new FormControl('', [Validators.required]);
  relationship = new FormControl('', [Validators.required]);

  constructor(private accountsService: AccountsService,
              private userService: UserService,
              private router: Router) {

    this.mailingAddressFormGroup = new FormGroup({
      streetAddress: this.streetAddress,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode
    });

    this.personalInformationFormGroup = new FormGroup({
      driversLicenseNumber: this.driversLicenseNumber,
      driversLicenseState: this.driversLicenseState,
      driversLicenseExpiration: this.driversLicenseExpiration,
      dateOfBirth: this.dateOfBirth,
      personalPhoneNumber: this.personalPhoneNumber
    });

    this.emergencyContactFormGroup = new FormGroup({
      fullName: this.fullName,
      primaryPhone: this.primaryPhone,
      relationship: this.relationship
    });
  }

  ngOnInit() {
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

  get personalNextDisabled() {
    return this.driversLicenseNumber.invalid || this.driversLicenseState.invalid || this.driversLicenseExpiration.invalid || this.dateOfBirth.invalid || this.personalPhoneNumber.invalid;
  }

  get saveDisabled() {
    return this.fullName.invalid || this.relationship.invalid || this.primaryPhone.invalid;
  }

  createAccount() {
    const request = this.buildRequest();

    this.submitted = true;

    this.accountsService.createAccount(request).subscribe(res => {
      if (!res.success) {
        this.error = res.error || res.message;
        this.submitted = false;
      } else {
        this.router.navigate(['client', 'account']).then();
      }
    });
  }

  private buildRequest(): CreateAccountRequest {
    return {
      mailingAddress: {
        streetAddress: this.streetAddress.value,
        city: this.city.value,
        state: this.state.value,
        zipCode: this.zipCode.value
      },
      driversLicense: {
        dateOfBirth: this.dateOfBirth.value,
        number: this.driversLicenseNumber.value,
        expiration: this.driversLicenseExpiration.value,
        state: this.driversLicenseState.value
      },
      emergencyContact: {
        fullName: this.fullName.value,
        primaryPhone: this.primaryPhone.value,
        relationship: this.relationship.value
      }
    }
  }
}
