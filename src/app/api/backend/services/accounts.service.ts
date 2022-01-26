import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Account} from "../../../data/types/accounts";
import {Observable} from "rxjs";
import {Burly} from "kb-burly";
import {CreateAccountRequest} from "../../../data/requests/create-account.request";
import {ManyResponse} from "../../../data/response/many.response";
import {IResponse} from "../../../data/response/response.interface";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private readonly apiEndpoint: string = environment.http.url;


  constructor(private httpClient: HttpClient) {
  }

  createAccount(request: CreateAccountRequest): Observable<IResponse<Account|string>> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/accounts')
      .get;

    return this.httpClient.post<IResponse<Account|string>>(url, request);
  }

  getCurrentAccount() {
    const url = Burly(this.apiEndpoint)
      .addSegment('/accounts')
      .addSegment('/me')
      .get;

    return this.httpClient.get<IResponse<Account|string>>(url);
  }

  updateAccount(account: Account): Observable<Account> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/accounts/')
      .addSegment(account.id)
      .get;


    return this.httpClient.patch<Account>(url, account);
  }

  getAccount(id: string): Observable<Account> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/accounts/')
      .addSegment(id)
      .get;

    return this.httpClient.get<Account>(url);
  }

  getAccounts(pageNumber: number, pageSize: number, sortBy?: string, sortDirection?: any, searchValue?: string | null) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/accounts')
      .addSegment('/list')
      .addQuery('limit', pageSize)
      .addQuery('page', pageNumber + 1)
      .addQuery('sortBy', sortBy, false)
      .addQuery('sortDirection', sortDirection, false)
      .addQuery('search', searchValue, false)
      .get;


    return this.httpClient.get<ManyResponse<Account>>(url);
  }
}
