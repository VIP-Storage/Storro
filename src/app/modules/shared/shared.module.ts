import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {RouterModule} from "@angular/router";
import {LoadingShadeComponent} from './components/loading-shade/loading-shade.component';
import {FormsModule} from "@angular/forms";
import {HoverElevationDirective} from './directives/hover-elevation.directive';
import {ToggleButtonComponent} from './components/toggle-button/toggle-button.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatRippleModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    SidebarComponent,
    LoadingShadeComponent,
    HoverElevationDirective,
    ToggleButtonComponent,
  ],
  exports: [
    SidebarComponent,
    HoverElevationDirective,
    ToggleButtonComponent,
    LoadingShadeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatTooltipModule
  ]
})
export class SharedModule {
}
