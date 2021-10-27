import {AfterViewInit, Component, HostBinding, Input, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BillingHistoryType} from "../../../../data/types/billing-history.type";
import {BillingService} from "../../../../api/backend/services/billing.service";
import {merge} from "rxjs";
import {map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.scss']
})
export class BillingHistoryComponent implements AfterViewInit {

  @Input()
  @HostBinding('class.mat-elevation-z3')
  showShadow: boolean = true;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  isLoading = true;
  displayedColumns: string[] = ['amount', 'paidOn', 'paidInFull', 'paymentMethod'];
  billingHistoryData: BillingHistoryType[] = [];
  total = 0;
  itemsPerPage = 18;

  constructor(private billingService: BillingService) {
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.billingService.getBillingHistory(this.itemsPerPage, this.paginator.pageIndex + 1);
        }),
        map(response => {
          this.isLoading = false;

          if (response === null) {
            return [];
          }

          this.total = response.total;
          return response.data;
        })
      ).subscribe(data => this.billingHistoryData = data);
  }
}
