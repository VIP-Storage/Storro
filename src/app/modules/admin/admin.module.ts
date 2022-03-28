import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminBaseComponent} from './admin-base/admin-base.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {SharedModule} from "../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {CreateUnitComponent} from './dialogs/create-unit/create-unit.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {CreateUnitTypeComponent} from './dialogs/create-unit-type/create-unit-type.component';
import {MatIconModule} from "@angular/material/icon";
import { SnapshotUrlComponent } from './dialogs/snapshot-url/snapshot-url.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./admin-pages/admin-pages.module').then(m => m.AdminPagesModule)
  },
  {
    path: 'units',
    loadChildren: () => import('./admin-units/admin-units.module').then(m => m.AdminUnitsModule)
  },
  {
    path: 'keycards',
    loadChildren: () => import('./admin-keycards/admin-keycards.module').then(m => m.AdminKeycardsModule)
  },
  {
    path: 'unit',
    loadChildren: () => import('./admin-unit/admin-unit.module').then(m => m.AdminUnitModule)
  },
];

@NgModule({
  declarations: [
    AdminBaseComponent,
    CreateUnitComponent,
    CreateUnitTypeComponent,
    SnapshotUrlComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    SharedModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    FormsModule
  ]
})
export class AdminModule {
}
