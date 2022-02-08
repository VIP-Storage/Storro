import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {from, Observable, of} from 'rxjs';
import {switchMap} from "rxjs/operators";
import {Account} from "../../../data/types";
import {AccountsService} from "../../../api/backend/services/accounts.service";

@Injectable({
  providedIn: 'root'
})
export class AccountResolver implements Resolve<Account | boolean> {
  constructor(private accountsService: AccountsService,
              private router: Router) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account | boolean> {
    return this.accountsService.getCurrentAccount().pipe(
      switchMap(response => {
        if (response.success && !!response.data) {
          return of(response.data as Account);
        }

        return from(this.router.navigate(['client', 'account', 'setup']))
      })
    )
  }
}
