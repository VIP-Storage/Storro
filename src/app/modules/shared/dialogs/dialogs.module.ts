import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DebugDialogComponent} from "./debug-dialog/debug-dialog.component";
import {MatTreeModule} from "@angular/material/tree";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {SharedModule} from "../shared.module";
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    DebugDialogComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent
  ],
  exports: [
    DebugDialogComponent
  ],
    imports: [
        CommonModule,
        MatTreeModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
        MatDividerModule,
        MatSelectModule,
        MatCheckboxModule
    ]
})
export class DialogsModule {
}
