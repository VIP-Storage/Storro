import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SingleCardPageComponent} from './single-card-page/single-card-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import { CardGridPageComponent } from './card-grid-page/card-grid-page.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    SingleCardPageComponent,
    CardGridPageComponent
  ],
    exports: [
        SingleCardPageComponent,
        CardGridPageComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatToolbarModule,
        RouterModule,
        MatGridListModule,
        MatTooltipModule,
    ]
})
export class LayoutModule {
}
