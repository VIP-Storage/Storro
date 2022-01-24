import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminTenantsComponent} from './admin-tenants/admin-tenants.component';
import {AdminUnitsComponent} from './admin-units/admin-units.component';
import {RouterModule, Routes} from "@angular/router";
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AdminUnitsMapComponent} from './admin-units-map/admin-units-map.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'units',
    component: AdminUnitsComponent
  },
  {
    path: 'units/map',
    component: AdminUnitsMapComponent
  },
  {
    path: 'users',
    component: AdminUsersComponent,
  },
  {
    path: 'tenants',
    component: AdminTenantsComponent
  }
]

@NgModule({
  declarations: [
    AdminTenantsComponent,
    AdminUnitsComponent,
    AdminDashboardComponent,
    AdminUnitsMapComponent,
    AdminUsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule
  ]
})
export class AdminPagesModule {
}
