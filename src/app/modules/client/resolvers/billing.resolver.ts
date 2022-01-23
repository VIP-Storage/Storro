import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {BillingService} from "../../../api/backend/services/billing.service";
import {Customer} from "../../../data/types/billing";

@Injectable({
  providedIn: 'root'
})
export class BillingResolver implements Resolve<Customer> {
  constructor(private billingService: BillingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer> {
    return this.billingService.getCustomer();
  }
}
