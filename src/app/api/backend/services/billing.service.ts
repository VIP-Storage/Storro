import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";
import {getBillingDemoData} from "../../../data/demo";
import {BillingHistoryResponse} from "../../../data/response/billing-history.response";

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor() {
  }

  getBillingHistory(pageSize: number, pageNumber: number): Observable<BillingHistoryResponse> {
    return of(getBillingDemoData(pageSize, pageNumber)).pipe(
      delay(150)
    )
  }
}
