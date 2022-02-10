import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Burly} from "kb-burly";
import {MonitorListingResponse} from "../../../data/response/monitor-listing.response";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MonitorListing} from "../../../data/types/zoneminder";
import {Unit} from "../../../data/types";
import {IResponse} from "../../../data/response";

@Injectable({
  providedIn: 'root'
})
export class ZoneminderService {

  private readonly apiEndpoint: string = environment.http.url;

  constructor(private httpClient: HttpClient) {
  }


  getMonitors(): Observable<MonitorListingResponse> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/zoneminder')
      .addSegment('/monitors')
      .get;

    return this.httpClient.get<MonitorListingResponse>(url);
  }

  getMonitor(id: string): Observable<MonitorListing> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/zoneminder')
      .addSegment('/monitors/')
      .addSegment(id)
      .get;

    return this.httpClient.get<MonitorListingResponse>(url).pipe(
      map(response => response.monitors[0])
    )
  }

  deleteMonitor(id: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/zoneminder')
      .addSegment('/monitors/')
      .addSegment(id)
      .get;

    return this.httpClient.delete(url);
  }

  createMonitor(name: string, cameraURL: string, unitID: string): Observable<IResponse<Unit>> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/zoneminder')
      .addSegment('/monitors')
      .get;

    return this.httpClient.post<IResponse<Unit>>(url, {name, cameraURL, unitID});
  }
}
