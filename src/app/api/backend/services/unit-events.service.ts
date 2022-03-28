import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DoorEvent, ManyResponse, MotionEvent, Unit} from "../../../data";
import {Burly} from "kb-burly";
import {DomSanitizer} from "@angular/platform-browser";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UnitEventsService {
  private readonly apiEndpoint: string = environment.http.url;

  constructor(private httpClient: HttpClient) {
  }

  getMotionEvents(pageNumber: number = 0, pageSize: number = 25, unit: Unit | undefined = undefined, showSnapshots: boolean = true): Observable<ManyResponse<MotionEvent>> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit-events')
      .addSegment('/motion')
      .addQuery('page', pageNumber + 1)
      .addQuery('limit', pageSize)
      .addQuery('showSnapshots', showSnapshots)
      .addQuery('unitID', (!!unit ? unit.id : null), false)
      .get

    return this.httpClient.get<ManyResponse<MotionEvent>>(url);
  }

  getMotionEvent(id: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit-events')
      .addSegment('/motion/')
      .addSegment(id)
      .get;

    return this.httpClient.get<MotionEvent>(url);
  }

  getMotionEventSnapshotURL(id: string, domSanitizer: DomSanitizer): Observable<any> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit-events')
      .addSegment('/motion/')
      .addSegment(id)
      .addSegment('/snapshot')
      .get

    return this.httpClient.get(url, {responseType: 'blob'}).pipe(
      map(e => domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))
    );
  }

  deleteMotionEvent(id: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit-events')
      .addSegment('/motion/')
      .addSegment(id)
      .get;

    return this.httpClient.delete<MotionEvent>(url);
  }

  getDoorEvents(pageNumber: number = 0, pageSize: number = 25, unit: Unit | undefined = undefined, showSnapshots: boolean = true): Observable<ManyResponse<DoorEvent>> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit-events')
      .addSegment('/door')
      .addQuery('page', pageNumber + 1)
      .addQuery('limit', pageSize)
      .addQuery('showSnapshots', showSnapshots)
      .addQuery('unitID', (!!unit ? unit.id : null), false)
      .get

    return this.httpClient.get<ManyResponse<DoorEvent>>(url);
  }

  getDoorEvent(id: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit-events')
      .addSegment('/door/')
      .addSegment(id)
      .get;

    return this.httpClient.get<DoorEvent>(url);
  }

  getDoorEventSnapshotURL(id: string, domSanitizer: DomSanitizer): Observable<any> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit-events')
      .addSegment('/door/')
      .addSegment(id)
      .addSegment('/snapshot')
      .get

    return this.httpClient.get(url, {responseType: 'blob'}).pipe(
      map(e => domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))
    );
  }

  deleteDoorEvent(id: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit-events')
      .addSegment('/door/')
      .addSegment(id)
      .get;

    return this.httpClient.delete<DoorEvent>(url);
  }
}
