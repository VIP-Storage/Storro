import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";
import {getDemoUnitAccessHistory, getDemoUnitData, getDemoUnits} from "../../../data/demo";
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
    // TODO: Replace this with proper backend call
    return UnitsService.getDemoUnits();
  }

  getUnit(id: string): Observable<UnitType | undefined> {
    // TODO: Replace this with proper backend call
    return UnitsService.getDemoUnit(id);
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
    return UnitsService.getDemoUnitAccessHistory(unit);
  }


  private static getDemoUnits(): Observable<UnitType[]> {
    return of(getDemoUnits()).pipe(delay(150))
  }

  private static getDemoUnit(id: string): Observable<UnitType | undefined> {
    return of(getDemoUnits().find(u => u.id === id)).pipe(delay(150))
  }


  private static getDemoUnitAccessHistory(unit?: UnitType): Observable<UnitAccessEntryType[]> {
    return of(getDemoUnitAccessHistory(unit)).pipe(delay(150))
  }
}
