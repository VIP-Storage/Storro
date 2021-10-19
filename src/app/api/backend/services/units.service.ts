import {Injectable} from '@angular/core';
import {UnitType} from "../../../data/types/unit.type";
import {Observable, of} from "rxjs";
import {getDemoUnitAccessHistory, getDemoUnitData, getDemoUnits} from "../../../data/demo/unit-demo.data";
import {delay} from "rxjs/operators";
import {UnitDataType} from "../../../data/types/unit-data.type";
import {UnitAccessEntryType} from "../../../data/types/unit-access-entry.type";

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  constructor() {
  }

  // TODO: Add parameter to check for client/admin
  getUnits(): Observable<UnitType[]> {
    // TODO: Replace this with proper backend call
    return UnitsService.getDemoUnits();
  }

  getUnit(id: number): Observable<UnitType | undefined> {
    // TODO: Replace this with proper backend call
    return UnitsService.getDemoUnit(id);
  }

  getUnitData(unit: UnitType): Observable<UnitDataType> {
    // TODO: Replace this with proper backend call
    return UnitsService.getDemoUnitData(unit);
  }

  getUnitAccessHistory(unit?: UnitType): Observable<UnitAccessEntryType[]> {
    // TODO: Replace this with proper backend call
    return UnitsService.getDemoUnitAccessHistory(unit);
  }


  private static getDemoUnits(): Observable<UnitType[]> {
    return of(getDemoUnits()).pipe(delay(150))
  }

  private static getDemoUnit(id: number): Observable<UnitType | undefined> {
    return of(getDemoUnits().find(u => u.id === id)).pipe(delay(150))
  }


  private static getDemoUnitData(unit: UnitType): Observable<UnitDataType> {
    return of(getDemoUnitData(unit) as UnitDataType).pipe(delay(150))
  }

  private static getDemoUnitAccessHistory(unit?: UnitType): Observable<UnitAccessEntryType[]> {
    return of(getDemoUnitAccessHistory(unit)).pipe(delay(150))
  }
}
