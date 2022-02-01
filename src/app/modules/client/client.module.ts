import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ClientBaseComponent} from './client-base/client-base.component';
import {UnitModule} from "../shared/unit/unit.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SharedModule} from "../shared/shared.module";
import {UnitPickerComponent} from './dialogs/unit-picker/unit-picker.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./client-pages/client-pages.module').then(m => m.ClientPagesModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./client-account/client-account.module').then(m => m.ClientAccountModule)
  }
];

@NgModule({
  declarations: [
    ClientBaseComponent,
    UnitPickerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UnitModule,
    MatSidenavModule,
    SharedModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class ClientModule {
}
