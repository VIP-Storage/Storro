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
import { VerifyComponent } from './pages/verify/verify.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SuccessComponent } from './pages/success/success.component';
import { ResetComponent } from './pages/reset/reset.component';
import {SharedModule} from "../shared/shared.module";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
    data: { animationState: 'Login' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animationState: 'Login' }
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
    data: { animationState: 'Forgot' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animationState: 'Register' }
  },
  {
    path: 'verify',
    component: VerifyComponent,
    data: { animationState: 'Verify' }
  },
  {
    path: 'reset',
    component: ResetComponent,
    data: { animationState: 'Reset' }
  },
  {
    path: 'success/:message',
    component: SuccessComponent,
    data: { animationState: 'Success' }
  },
  {
    path: '**',
    redirectTo: 'login'
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    AuthBaseComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    VerifyComponent,
    SuccessComponent,
    ResetComponent
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
        MatDividerModule,
        MatProgressSpinnerModule,
        SharedModule
    ]
})
export class AuthModule {
}
