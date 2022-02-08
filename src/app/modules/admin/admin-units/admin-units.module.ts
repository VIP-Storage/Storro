import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminUnitsComponent} from "./pages/admin-units/admin-units.component";
import {AdminUnitsMapComponent} from "./pages/admin-units-map/admin-units-map.component";
import {AdminImportUnitsComponent} from "./pages/admin-import-units/admin-import-units.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {SharedModule} from "../../shared/shared.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatGridListModule} from "@angular/material/grid-list";
import {AccessModule} from "../../shared/access/access.module";
import {UnitModule} from "../../shared/unit/unit.module";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatTreeModule} from "@angular/material/tree";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {AdminSideUnitSummaryComponent} from './components/admin-side-unit-summary/admin-side-unit-summary.component';


const routes: Routes = [
  {
    path: '',
    component: AdminUnitsComponent
  },
  {
    path: 'create',
    component: AdminUnitsComponent,
    data: {
      create: true
    }
  },
  {
    path: 'map',
    component: AdminUnitsMapComponent
  },
  {
    path: 'import',
    component: AdminImportUnitsComponent
  },
  {
    path: ':id',
    redirectTo: '/admin/unit/:id'
  },
]

@NgModule({
  declarations: [
    AdminUnitsComponent,
    AdminUnitsMapComponent,
    AdminImportUnitsComponent,
    AdminSideUnitSummaryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatListModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule,
    MatGridListModule,
    AccessModule,
    UnitModule,
    NgxDropzoneModule,
    MatTreeModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class AdminUnitsModule {
}
