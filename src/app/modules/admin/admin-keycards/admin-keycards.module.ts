import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminKeycardsComponent} from "./pages/admin-keycards/admin-keycards.component";
import {AdminCreateKeycardComponent} from "./pages/admin-create-keycard/admin-create-keycard.component";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTabsModule} from "@angular/material/tabs";
import { AdminKeycardsTableComponent } from './components/admin-keycards-table/admin-keycards-table.component';
import { AdminKeycardRequestTableComponent } from './components/admin-keycard-request-table/admin-keycard-request-table.component';
import { KeycardRequestDialogComponent } from './dialogs/keycard-request-dialog/keycard-request-dialog.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {LayoutModule} from "../../layout/layout.module";


const routes: Routes = [
  {
    path: '',
    component: AdminKeycardsComponent,
    data: { breadcrumb: 'Key Cards' }
  },
  {
    path: ':id',
    component: AdminKeycardsComponent,
    data: { breadcrumb: 'Key Cards' }
  },
  {
    path: 'create',
    component: AdminCreateKeycardComponent,
    data: { breadcrumb: 'Create' }
  },
]

@NgModule({
  declarations: [
    AdminKeycardsComponent,
    AdminCreateKeycardComponent,
    AdminKeycardsTableComponent,
    AdminKeycardRequestTableComponent,
    KeycardRequestDialogComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        MatButtonModule,
        MatStepperModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatListModule,
        SharedModule,
        NgxMaskModule.forChild(),
        MatPaginatorModule,
        MatTabsModule,
        MatToolbarModule,
        MatButtonToggleModule,
        FormsModule,
        LayoutModule
    ]
})
export class AdminKeycardsModule {
}
