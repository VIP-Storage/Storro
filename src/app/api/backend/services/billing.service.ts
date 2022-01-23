import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {delay, map, shareReplay} from "rxjs/operators";
import {getBillingDemoData} from "../../../data/demo";
import {BillingHistoryResponse} from "../../../data/response/billing-history.response";
import {PaymentMethod} from "../../../data/types";
import {Customer} from "../../../data/types/billing";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Burly} from "kb-burly";
import {ManyResponse} from "../../../data/response/many.response";
import {Token} from "@stripe/stripe-js";
import {CreatePaymentMethodRequest} from "../../../data/requests/create-payment-method.request";

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  private currentPaymentMethods: Observable<PaymentMethod[]> | null = null;
  private readonly apiEndpoint: string = environment.http.url;

  constructor(private httpClient: HttpClient) {
  }

  getCustomer(): Observable<Customer> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/billing')
      .addSegment('/me')
      .addSegment('/customer')
      .get;

    return this.httpClient.get<Customer>(url)
  }

  getBillingHistory(pageSize: number, pageNumber: number): Observable<BillingHistoryResponse> {
    return of(getBillingDemoData(pageSize, pageNumber)).pipe(
      delay(150)
    )
  }

  getPaymentMethods(): Observable<PaymentMethod[]> {
    if (!this.currentPaymentMethods) {
      const url = Burly(this.apiEndpoint)
        .addSegment('/billing')
        .addSegment('/me')
        .addSegment('/customer')
        .addSegment('/payment-methods')
        .get;

      this.currentPaymentMethods = this.httpClient.get<ManyResponse<PaymentMethod>>(url).pipe(
        map(res => res.items),
      )
    }

    return this.currentPaymentMethods;
  }

  createPaymentMethod(token: Token, name: string) {
    let body: CreatePaymentMethodRequest|null = null;

    const url = Burly(this.apiEndpoint)
      .addSegment('/billing')
      .addSegment('/me')
      .addSegment('/customer')
      .addSegment('/payment-methods')
      .addSegment('/create')
      .get;

    if (!!token.card) {
      body = {
        expires: `${token.card.exp_month}/${token.card.exp_year}`,
        readableID: token.card.last4,
        cardID: token.card.id,
        sourceID: token.id,
        name,
        type: token.card.brand
      }

    }

    return this.httpClient.post(url, body || {});
  }

  deletePaymentMethod(id: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/billing')
      .addSegment('/me')
      .addSegment('/customer')
      .addSegment('/payment-methods/')
      .addSegment(id)
      .get;

    return this.httpClient.delete(url);
  }

  getCurrentPaymentMethod(): Observable<PaymentMethod | undefined> {
    return this.getPaymentMethods().pipe(
      map(methods => methods[0])
    )
  }
}
