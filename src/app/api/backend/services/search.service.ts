import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Burly} from "kb-burly";
import {UnifiedSearchResponse} from "../../../data/response";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import {SearchType} from "../../../data/enums";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly apiEndpoint: string = environment.http.url;

  constructor(private httpClient: HttpClient) {
  }

  globalSearch(query: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/search')
      .addQuery('query', query)
      .get;


    if (!query || query.length === 0) {
      return [];
    }

    return this.httpClient.get<UnifiedSearchResponse>(url).pipe(
      map(response => response.results),
      catchError(() => of([]))
    )
  }

  forceIndex() {
    const url = Burly(this.apiEndpoint)
      .addSegment('/search')
      .addSegment('/rebuildIndex')
      .get;

    return this.httpClient.get<boolean>(url);
  }

  getIcon(type: SearchType) {
    switch (type) {
      case SearchType.KeyCards:
        return 'badge';
      case SearchType.Accounts:
        return 'attach_money';
      case SearchType.Users:
        return 'manage_accounts';
      case SearchType.Units:
        return 'house_siding';
    }
  }
}
