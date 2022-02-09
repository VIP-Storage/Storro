import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleCardPageComponent } from './single-card-page/single-card-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {BreadcrumbModule} from "xng-breadcrumb";



@NgModule({
  declarations: [
    SingleCardPageComponent
  ],
  exports: [
    SingleCardPageComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        BreadcrumbModule
    ]
})
export class LayoutModule { }
