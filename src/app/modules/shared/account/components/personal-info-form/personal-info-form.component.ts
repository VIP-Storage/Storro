import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpirationValidator} from "../../validator/expiration.validator";
import {Account} from "../../../../../data/types";
import {StateHelper} from "../../../helpers/state.helper";

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss']
})
export class PersonalInfoFormComponent {

  @Input()
  set account(account: Account | null) {
    if (!!account) {
      this.driversLicenseNumber.setValue(account.driversLicense.number);
      this.driversLicenseState.setValue(account.driversLicense.state);
      this.driversLicenseExpiration.setValue(account.driversLicense.expiration);

    }
  }

  allStates = StateHelper.states;
  personalInformationFormGroup: FormGroup;

  // Personal Information
  driversLicenseNumber = new FormControl('', [Validators.required]);
  driversLicenseState = new FormControl('', [Validators.required]);
  driversLicenseExpiration = new FormControl('', [Validators.required, ExpirationValidator.driversLicense]);
  dateOfBirth = new FormControl('', [Validators.required]);
  personalPhoneNumber = new FormControl('', [Validators.required]);

  constructor() {
    this.personalInformationFormGroup = new FormGroup({
      driversLicenseNumber: this.driversLicenseNumber,
      driversLicenseState: this.driversLicenseState,
      driversLicenseExpiration: this.driversLicenseExpiration,
      dateOfBirth: this.dateOfBirth,
      personalPhoneNumber: this.personalPhoneNumber
    });
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

  get personalNextDisabled() {
    return this.driversLicenseNumber.invalid || this.driversLicenseState.invalid || this.driversLicenseExpiration.invalid || this.dateOfBirth.invalid || this.personalPhoneNumber.invalid;
  }

  get data() {
    return {
      dateOfBirth: this.dateOfBirth.value,
      number: this.driversLicenseNumber.value,
      expiration: this.driversLicenseExpiration.value,
      state: this.driversLicenseState.value,
      personalPhoneNumber: this.personalPhoneNumber.value
    }
  }
}
