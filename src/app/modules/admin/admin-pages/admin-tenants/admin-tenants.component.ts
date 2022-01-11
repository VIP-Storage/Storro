import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {User} from "../../../../data/types";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {UserService} from "../../../../api/backend/services/user.service";

@Component({
  selector: 'app-admin-tenants',
  templateUrl: './admin-tenants.component.html',
  styleUrls: ['./admin-tenants.component.scss']
})
export class AdminTenantsComponent implements AfterViewInit {

  displayedColumns: string[] = ['email', 'createdAt'];
  tenants: User[] = [];
  tenantsCount = 0;
  isLoadingTenants = true;
  didError = false;
  pageSize = 30;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingTenants = true;
          return this.userService.getTenants(
            this.paginator.pageIndex,
            this.pageSize,
            this.sort.active,
            this.sort.direction,
          ).pipe(catchError(() => of(null)));
        }),
        map(data => {
          this.isLoadingTenants = false;
          this.didError = data === null;

          if (data === null) {
            return [];
          }

          this.tenantsCount = data.meta.itemCount;
          return data.items
        }),
      ).subscribe(data => (this.tenants = data));
  }
}
