import {Component, Input, ViewChild} from '@angular/core';
import {CreateAccountRequest} from "../../../../../data/requests";
import {AccountsService} from "../../../../../api/backend/services/accounts.service";
import {UserService} from "../../../../../api/backend/services/user.service";
import {Router} from "@angular/router";
import {storroAnimations} from "../../../animations";
import {MailingAddressFormComponent} from "../mailing-address-form/mailing-address-form.component";
import {PersonalInfoFormComponent} from "../personal-info-form/personal-info-form.component";
import {EmergencyContactFormComponent} from "../emergency-contact-form/emergency-contact-form.component";

@Component({
  selector: 'app-create-account-stepper',
  templateUrl: './create-account-stepper.component.html',
  styleUrls: ['./create-account-stepper.component.scss'],
  animations: storroAnimations
})
export class CreateAccountStepperComponent {

  @ViewChild(MailingAddressFormComponent) mailingAddressForm!: MailingAddressFormComponent;
  @ViewChild(PersonalInfoFormComponent) personalInfoForm!: PersonalInfoFormComponent;
  @ViewChild(EmergencyContactFormComponent) emergencyContactForm!: EmergencyContactFormComponent;

  @Input()
  googleAvailable: boolean = false;

  error: string | null = null;
  submitted: boolean = false;

  constructor(private accountsService: AccountsService,
              private userService: UserService,
              private router: Router) {

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
    const personal = this.personalInfoForm.data;

    return {
      mailingAddress: this.mailingAddressForm.data,
      driversLicense: personal,
      emergencyContact: this.emergencyContactForm.data,
      personalPhoneNumber: personal.personalPhoneNumber
    }
  }
}
