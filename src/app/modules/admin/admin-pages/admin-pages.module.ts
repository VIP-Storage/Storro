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
    path: 'tenants',
    component: AdminTenantsComponent
  }
]

@NgModule({
  declarations: [
    AdminTenantsComponent,
    AdminUnitsComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule
  ]
})
export class AdminPagesModule {
}
