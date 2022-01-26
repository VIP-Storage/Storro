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
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {CreateUnitTypeComponent} from './dialogs/create-unit-type/create-unit-type.component';
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./admin-pages/admin-pages.module').then(m => m.AdminPagesModule)
  }
];

@NgModule({
    declarations: [
        AdminBaseComponent,
        CreateUnitComponent,
        CreateUnitTypeComponent,
    ],
    exports: [
    ],
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
        MatIconModule
    ]
})
export class AdminModule {
}
