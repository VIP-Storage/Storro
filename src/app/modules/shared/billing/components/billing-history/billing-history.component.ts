import {AfterViewInit, Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {BillingHistoryType} from "../../../../../data/types";
import {BillingService} from "../../../../../api/backend/services/billing.service";

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.scss']
})
export class BillingHistoryComponent implements AfterViewInit {


  isLoading = true;
  displayedColumns: {name: string; title: string}[] = [
    {
      name: 'amount',
      title: 'Amount'
    },
    {
      name: 'status',
      title: 'Status'
    },
    {
      name: 'paidOn',
      title: 'Paid On'
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method'
    }
  ];
  billingHistoryData: BillingHistoryType[] = [];
  total = 0;
  itemsPerPage = 18;

  constructor(private billingService: BillingService) {
  }


  ngAfterViewInit() {
    this.billingService.getBillingHistory(this.itemsPerPage, 1).pipe(
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
