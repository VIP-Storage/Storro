import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ClientAccountComponent} from "./pages/client-account/client-account.component";
import {AccountResolver} from "../resolvers/account.resolver";
import {NoAccountGuard} from "../guards/no-account.guard";
import {ClientAccountSetupComponent} from "./pages/client-account-setup/client-account-setup.component";
import {MatCardModule} from "@angular/material/card";
import {AccountModule} from "../../shared/account/account.module";
import {MatDividerModule} from "@angular/material/divider";
import {SharedModule} from "../../shared/shared.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {LayoutModule} from "../../layout/layout.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {ClientCredentialsComponent} from './pages/client-credentials/client-credentials.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {ClientPersonalComponent} from './pages/client-personal/client-personal.component';
import {ClientPasswordChangeComponent} from './pages/client-password-change/client-password-change.component';


const routes: Routes = [
  {
    path: '',
    component: ClientAccountComponent,
    resolve: {
      account: AccountResolver
    }
  },
  {
    path: 'setup',
    canActivate: [NoAccountGuard],
    component: ClientAccountSetupComponent
  },
  {
    path: 'credentials',
    component: ClientCredentialsComponent,
  },
  {
    path: 'personal',
    component: ClientPersonalComponent,
    resolve: {
      account: AccountResolver
    }
  },
  {
    path: 'password',
    component: ClientPasswordChangeComponent,
  }
]

@NgModule({
  declarations: [
    ClientAccountComponent,
    ClientAccountSetupComponent,
    ClientCredentialsComponent,
    ClientPersonalComponent,
    ClientPasswordChangeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    AccountModule,
    MatDividerModule,
    SharedModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    LayoutModule,
    MatGridListModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule
  ]
})
export class ClientAccountModule {
}
