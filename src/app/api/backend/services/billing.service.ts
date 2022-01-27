import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {BillingHistoryType, PaymentMethod} from "../../../data/types";
import {Customer} from "../../../data/types";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Burly} from "kb-burly";
import {ManyResponse} from "../../../data/response/many.response";
import {Token} from "@stripe/stripe-js";
import {CreatePaymentMethodRequest} from "../../../data/requests/create-payment-method.request";
import {IResponse} from "../../../data/response/response.interface";

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

  getBillingHistory(pageSize: number, pageNumber: number): Observable<ManyResponse<BillingHistoryType>> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/billing')
      .addSegment('/me')
      .addSegment('/customer')
      .addSegment('/billing-history')
      .addQuery('limit', pageSize)
      .get;

    return this.httpClient.get<ManyResponse<BillingHistoryType>>(url);
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

  getLastPayment() {
    const url = Burly(this.apiEndpoint)
      .addSegment('/billing')
      .addSegment('/me')
      .addSegment('/customer')
      .addSegment('/billing-history')
      .addSegment('/last')
      .get;

    return this.httpClient.get<IResponse<BillingHistoryType>>(url);
  }

  getNextPayment() {
    const url = Burly(this.apiEndpoint)
      .addSegment('/billing')
      .addSegment('/me')
      .addSegment('/customer')
      .addSegment('/billing-history')
      .addSegment('/next')
      .get;

    return this.httpClient.get<IResponse<BillingHistoryType>>(url);
  }
}
