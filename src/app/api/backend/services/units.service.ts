import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";
import {UnitAccessEntryType, UnitDataType, UnitType} from "../../../data/types";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Burly} from "kb-burly";

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  private readonly apiEndpoint: string = environment.http.url;


  constructor(private httpClient: HttpClient) {
  }

  // TODO: Add parameter to check for client/admin
  getUnits(): Observable<UnitType[]> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/list')
      .get

    return this.httpClient.get<{data: UnitType[]}>(url).pipe(
      map(response => response.data)
    );
  }

  getUnit(id: string): Observable<UnitType | undefined> {
    // TODO: Replace this with proper backend call
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit/')
      .addSegment(id)
      .get

    return this.httpClient.get<UnitType|undefined>(url);
  }

  getUnitSnapshotURL(unit: UnitType) {
    return Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/snapshot/')
      .addSegment(unit.id)
      .addQuery('now',  Math.random())
      .get
  }

  getUnitData(unit: UnitType): Observable<UnitDataType> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/state/')
      .addSegment(unit.id)
      .get;

    return this.httpClient.get<UnitDataType>(url);
  }

  getUnitAccessHistory(unit?: UnitType): Observable<UnitAccessEntryType[]> {
    // TODO: Replace this with proper backend call
    return of([]);
  }

}
