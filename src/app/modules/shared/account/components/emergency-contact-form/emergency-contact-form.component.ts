import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../../../../data/types";

@Component({
  selector: 'app-emergency-contact-form',
  templateUrl: './emergency-contact-form.component.html',
  styleUrls: ['./emergency-contact-form.component.scss']
})
export class EmergencyContactFormComponent {

  @Input()
  set account(account: Account | null) {
    if (!!account) {
      this.fullName.setValue(account.emergencyContact.fullName);
      this.primaryPhone.setValue(account.emergencyContact.primaryPhone);
      this.relationship.setValue(account.emergencyContact.relationship);
    }
  }

  emergencyContactFormGroup: FormGroup;

  // Emergency Contact
  fullName = new FormControl('', [Validators.required]);
  primaryPhone = new FormControl('', [Validators.required]);
  relationship = new FormControl('', [Validators.required]);

  constructor() {
    this.emergencyContactFormGroup = new FormGroup({
      fullName: this.fullName,
      primaryPhone: this.primaryPhone,
      relationship: this.relationship
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


  get saveDisabled() {
    return this.fullName.invalid || this.relationship.invalid || this.primaryPhone.invalid;
  }

  get data() {
    return {
      fullName: this.fullName.value,
      primaryPhone: this.primaryPhone.value,
      relationship: this.relationship.value
    }
  }
}
