import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";
import {getBillingDemoData, getPaymentMethodDemoData} from "../../../data/demo";
import {BillingHistoryResponse} from "../../../data/response/billing-history.response";
import {PaymentMethod} from "../../../data/types";

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

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return of(getPaymentMethodDemoData()).pipe(
      delay(150)
    )
  }

  getCurrentPaymentMethod(): Observable<PaymentMethod|undefined> {
    return this.getPaymentMethods().pipe(
      map(methods => methods.find(m => m.current))
    )
  }
}
