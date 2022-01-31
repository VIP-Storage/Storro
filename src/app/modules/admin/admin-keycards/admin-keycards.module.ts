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
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTabsModule} from "@angular/material/tabs";


const routes: Routes = [
  {
    path: '',
    component: AdminKeycardsComponent
  },
  {
    path: 'create',
    component: AdminCreateKeycardComponent
  },
]

@NgModule({
  declarations: [
    AdminKeycardsComponent,
    AdminCreateKeycardComponent
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
    MatTabsModule
  ]
})
export class AdminKeycardsModule {
}
