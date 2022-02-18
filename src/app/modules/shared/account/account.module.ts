import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
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
import {
  CreateAccountStepperComponent,
  EmergencyContactFormComponent,
  MailingAddressFormComponent,
  PersonalInfoFormComponent
} from "./components";
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    CreateAccountStepperComponent,
    MailingAddressFormComponent,
    EmergencyContactFormComponent,
    PersonalInfoFormComponent,
    ChangePasswordFormComponent
  ],
  exports: [
    CreateAccountStepperComponent,
    MailingAddressFormComponent,
    EmergencyContactFormComponent,
    PersonalInfoFormComponent,
    ChangePasswordFormComponent
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
    SharedModule,
    MatIconModule
  ]
})
export class AccountModule {
}
