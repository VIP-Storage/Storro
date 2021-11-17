import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {from, Observable, of} from 'rxjs';
import {UnitsService} from "../../api/backend/services/units.service";
import {switchMap} from "rxjs/operators";
import {UnitType} from "../../data/types";

@Injectable({
  providedIn: 'root'
})
export class UnitResolver implements Resolve<UnitType | boolean> {
  constructor(private unitsService: UnitsService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UnitType | boolean> {
    const unitID = route.paramMap.get('id');

    if (!unitID) {
      return from(this.router.navigate(['client', 'dashboard']));
    }

    return this.unitsService.getUnit(unitID).pipe(
      switchMap(unit => {
        if (!!unit) {
          return of(unit as UnitType);
        }

        return from(this.router.navigate(['client', 'dashboard']))
      })
    )
  }
}
