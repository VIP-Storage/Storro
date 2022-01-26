import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {from, Observable, of} from 'rxjs';
import {switchMap} from "rxjs/operators";
import {Account} from "../../../data/types/accounts";
import {AccountsService} from "../../../api/backend/services/accounts.service";

@Injectable({
  providedIn: 'root'
})
export class AccountResolver implements Resolve<Account | boolean> {
  constructor(private accountsService: AccountsService,
              private router: Router) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account | boolean> {
    const accountID = route.paramMap.get('id');

    if (!accountID) {
      return from(this.router.navigate(['admin', 'accounts']));
    }

    return this.accountsService.getAccount(accountID).pipe(
      switchMap(account => {
        if (!!account) {
          return of(account as Account);
        }

        return from(this.router.navigate(['admin', 'accounts']))
      })
    )
  }
}
