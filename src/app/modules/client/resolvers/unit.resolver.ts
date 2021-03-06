import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {from, Observable, of} from 'rxjs';
import {switchMap} from "rxjs/operators";
import {UnitsService} from "../../../api/backend/services/units.service";
import {Unit} from "../../../data/types";

@Injectable({
  providedIn: 'root'
})
export class UnitResolver implements Resolve<Unit | boolean> {
  constructor(private unitsService: UnitsService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Unit | boolean> {
    const unitID = route.paramMap.get('id');

    if (!unitID) {
      return from(this.router.navigate(['client', 'dashboard']));
    }

    return this.unitsService.getUnit(unitID).pipe(
      switchMap(unit => {
        if (!!unit) {
          return of(unit as Unit);
        }

        return from(this.router.navigate(['client', 'dashboard']))
      })
    )
  }
}
