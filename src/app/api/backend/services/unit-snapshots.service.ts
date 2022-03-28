import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IResponse, Unit} from "../../../data";
import {Burly} from "kb-burly";
import {DomSanitizer} from "@angular/platform-browser";
import {map} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UnitSnapshotsService {
  private readonly apiEndpoint: string = environment.http.url;

  constructor(private httpClient: HttpClient) {
  }


  downloadSnapshot(passedURL: any) {
    const safeURL: {changingThisBreaksApplicationSecurity: string} = passedURL;
    const imageURL = safeURL.changingThisBreaksApplicationSecurity;

    this.httpClient.get(imageURL, {responseType: 'blob' as 'json'})
      .subscribe((res: any) => {
        const file = new Blob([res], {type: res.type});

        // IE
        if (window.navigator && window.navigator.hasOwnProperty('msSaveOrOpenBlob')) {
          // @ts-ignore
          window.navigator.msSaveOrOpenBlob(file);
          return;
        }

        const blob = (window.webkitURL || window.URL).createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = 'snapshot.png';

        // Version link.click() to work at firefox
        link.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        }));

        setTimeout(() => { // firefox
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);
      });
  }

  updateStreamURL(unitID: string, newURL: string): Observable<IResponse> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/snapshot/')
      .addSegment(unitID)
      .get;

    return this.httpClient.patch<IResponse>(url, {
      newURL
    });
  }

  saveSnapshot(unitID: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/snapshot/')
      .addSegment(unitID)
      .addSegment('/save')
      .get;

    return this.httpClient.get(url);
  }

  getSavedUnitSnapshotURL(unit: Unit, snapshotID: number, domSanitizer: DomSanitizer): Observable<any> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/savedSnapshot/')
      .addSegment(unit.id)
      .addSegment(`/${snapshotID}`)
      .get

    return this.httpClient.get(url, {responseType: 'blob'}).pipe(
      map(e => domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))
    );
  }

  getUnitSnapshotURL(unit: Unit, domSanitizer: DomSanitizer): Observable<any> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/snapshot/')
      .addSegment(unit.id)
      .addQuery('now', Math.random())
      .get

    return this.httpClient.get(url, {responseType: 'blob'}).pipe(
      map(e => domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))
    );
  }
}
