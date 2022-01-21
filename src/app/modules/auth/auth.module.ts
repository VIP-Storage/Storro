import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './pages/login/login.component';
import {RouterModule, Routes} from "@angular/router";
import { AuthBaseComponent } from './auth-base/auth-base.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './pages/register/register.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    AuthBaseComponent,
    ForgotPasswordComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class AuthModule {
}
