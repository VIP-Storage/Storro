import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ManyResponse} from "../../../data/response/many.response";
import {Stat} from "../../../data/types";
import {Burly} from "kb-burly";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private readonly apiEndpoint: string = environment.http.url;

  constructor(private httpClient: HttpClient) {
  }

  getDashboardStats(): Observable<ManyResponse<Stat>> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/stats')
      .addSegment('/dashboard')
      .get

    return this.httpClient.get<ManyResponse<Stat>>(url);
  }

}
