import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountsService} from "../../../api/backend/services/accounts.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NoAccountGuard implements CanActivate {
  constructor(private accountsService: AccountsService,) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountsService.getCurrentAccount().pipe(
      map(res => !res.success)
    )
  }
}
