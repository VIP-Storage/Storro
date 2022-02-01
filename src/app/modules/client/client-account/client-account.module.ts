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
import { ClientCredentialsCardComponent } from './components/client-credentials-card/client-credentials-card.component';
import {MatListModule} from "@angular/material/list";
import { ClientRequestedCredentialsCardComponent } from './components/client-requested-credentials-card/client-requested-credentials-card.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";


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
  }
]

@NgModule({
  declarations: [
    ClientAccountComponent,
    ClientAccountSetupComponent,
    ClientCredentialsCardComponent,
    ClientRequestedCredentialsCardComponent
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
    MatFormFieldModule
  ]
})
export class ClientAccountModule {
}
