import {Injectable} from '@angular/core';
import {UnitType, User} from "../../../data/types";
import {forkJoin, Observable, of} from "rxjs";
import {getDemoAccessibleUsersForUnit, getDemoOwnerForUnit} from "../../../data/demo/users-demo.data";
import {delay, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  getOwnerForUnit(unit: UnitType): Observable<User | undefined> {
    return of(getDemoOwnerForUnit(unit)).pipe(
      delay(150)
    )
  }

  getAccessibleUsersForUnit(unit: UnitType): Observable<User[]> {
    return of(getDemoAccessibleUsersForUnit(unit)).pipe(
      delay(150)
    )
  }

  countUsersAssociated(unit: UnitType): Observable<number> {
    return this.getUsersAssociated(unit).pipe(
      map(users => {
        console.log('USERS', users);
        return users.length;
      })
    );
  }

  getUsersAssociated(unit: UnitType, max: number = 0): Observable<User[]> {
    return forkJoin(
      {
        owner: this.getOwnerForUnit(unit),
        users: this.getAccessibleUsersForUnit(unit)
      }
    ).pipe(
      map(result => {

        const users = result.users.filter(u => !!u) as User[];
        const owner = result.owner;

        if (owner !== undefined) {
          owner.isOwner = true;

          return [owner, ...UserService.limitArray(users, max)];
        }

        return UserService.limitArray(users, max);
      }),
    )
  }

  private static limitArray<T>(array: T[], max: number = 0): T[] {
    if (max > 0) {
      return array.slice(Math.max(array.length - max, 0))
    } else if (max < 0) {
      return [];
    }

    return array;
  }
}
