import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {CreateAccountStepperComponent} from './components/create-account-stepper/create-account-stepper.component';
import {MatStepperModule} from "@angular/material/stepper";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMaskModule} from "ngx-mask";
import {SharedModule} from "../shared.module";
import {MailingAddressFormComponent} from './components/mailing-address-form/mailing-address-form.component';
import {EmergencyContactFormComponent} from './components/emergency-contact-form/emergency-contact-form.component';
import {PersonalInfoFormComponent} from "./components/personal-info-form/personal-info-form.component";


@NgModule({
  declarations: [
    CreateAccountStepperComponent,
    MailingAddressFormComponent,
    EmergencyContactFormComponent,
    PersonalInfoFormComponent
  ],
    exports: [
        CreateAccountStepperComponent,
        MailingAddressFormComponent,
        EmergencyContactFormComponent,
        PersonalInfoFormComponent
    ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    GooglePlaceModule,
    MatSelectModule,
    MatDividerModule,
    MatDatepickerModule,
    NgxMaskModule.forRoot({
      validation: true
    }),
    SharedModule
  ]
})
export class AccountModule {
}
