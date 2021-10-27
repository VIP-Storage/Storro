import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {BillingHistoryType} from "../../../data/types/billing-history.type";
import {getBillingDemoData} from "../../../data/demo/billing-demo.data";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor() {
  }

  getBillingHistory(pageSize: number, pageNumber: number): Observable<{data: BillingHistoryType[], total: number}> {
    return of(getBillingDemoData(pageSize, pageNumber)).pipe(
      delay(150)
    )
  }
}
