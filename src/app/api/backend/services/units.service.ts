import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError, delay, map} from "rxjs/operators";
import {UnitAccessEntryType, UnitDataType, Unit} from "../../../data/types";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Burly} from "kb-burly";
import {ManyResponse} from "../../../data/response/many.response";

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  private readonly apiEndpoint: string = environment.http.url;


  constructor(private httpClient: HttpClient) {
  }

  getUnits(pageNumber: number = 0, pageSize: number = 25): Observable<ManyResponse<Unit>> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/list')
      .addQuery('page', pageNumber)
      .addQuery('limit', pageSize)
      .get

    return this.httpClient.get<ManyResponse<Unit>>(url);
  }

  getUnit(id: string): Observable<Unit | null> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit/')
      .addSegment(id)
      .get

    return this.httpClient.get<Unit|null>(url).pipe(
      catchError(err => {
        console.warn('Could not retrieve unit', err);
        return of(null)
      })
    )
  }

  unitExists(id: string): Observable<boolean> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/exists/')
      .addSegment(id)
      .get

    return this.httpClient.get<boolean>(url).pipe(
      catchError(err => {
        console.warn('Could not retrieve unit', err);
        return of(false)
      })
    )
  }

  getUnitSnapshotURL(unit: Unit) {
    return Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/snapshot/')
      .addSegment(unit.id)
      .addQuery('now',  Math.random())
      .get
  }

  getUnitData(unit: Unit): Observable<UnitDataType> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/state/')
      .addSegment(unit.id)
      .get;

    return this.httpClient.get<UnitDataType>(url);
  }

  getUnitAccessHistory(unit?: Unit): Observable<UnitAccessEntryType[]> {
    // TODO: Replace this with proper backend call
    return of([]);
  }

}
