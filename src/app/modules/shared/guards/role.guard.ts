import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../../../api/backend/services/user.service";
import {map} from "rxjs/operators";
import {Role} from "../../../data/enums";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userService.currentRole.pipe(
      map(role => {
        const isClientPath = route.url[0].path === 'client';

        if (role !== Role.Tenant && isClientPath) {
          return this.router.createUrlTree(['/admin', 'dashboard'])
        }

        return true;
      })
    )

  }

}
