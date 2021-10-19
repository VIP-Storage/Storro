import {Injectable} from '@angular/core';
import {UnitType} from "../../../data/types/unit.type";
import {Observable, of} from "rxjs";
import {getDemoUnitData, getDemoUnits} from "../../../data/demo/unit-demo.data";
import {delay, tap} from "rxjs/operators";
import {UnitDataType} from "../../../data/types/unit-data.type";

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  constructor() {
  }

  // TODO: Add parameter to check for client/admin
  getUnits(): Observable<UnitType[]> {
    // TODO: Replace this with proper backend call
    return this.getDemoUnits();
  }

  getUnitData(unit: UnitType): Observable<UnitDataType | null> {
    // TODO: Replace this with proper backend call
    return this.getDemoUnitData(unit);
  }

  private getDemoUnits(): Observable<UnitType[]> {
    return of(getDemoUnits()).pipe(
      delay(150)
    )
  }

  private getDemoUnitData(unit: UnitType): Observable<UnitDataType | null> {
    return of(getDemoUnitData(unit))
      .pipe(
        delay(150),
        tap(data => console.log('Demo unit data', data))
      )
  }
}
