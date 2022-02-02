import {Component, HostListener, Input} from '@angular/core';
import {Stat} from "../../../../data/types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent {

  @Input()
  stat!: Stat;

  @HostListener('click')
  click() {
    return this.router.navigateByUrl(this.routerLink);
  }

  constructor(private router: Router) {
  }

  get icon() {
    switch (this.stat.name) {
      case 'Users':
        return 'manage_accounts';
      case 'Tenants':
        return 'people';
      case 'Available Units':
        case 'Unavailable Units':
        return 'home';
      case  'Accounts':
        return 'attach_money';
      case 'Unit Types':
        return 'holiday_village';
      case 'Key Cards':
        return 'badge';
      case 'Key Card Requests':
        return 'add_to_photos';
      default:
        return '';
    }
  }

  get iconClass() {
    switch (this.stat.name) {
      case 'Accounts':
        return 'success';
      case 'Unavailable Units':
        return 'error';
      default:
        return '';
    }
  }

  get routerLink() {
    switch (this.stat.name) {
      case 'Users':
        return '/admin/users';
      case 'Tenants':
        return '/admin/tenants';
      case 'Available Units':
      case 'Unavailable Units':
      case 'Unit Types':
        return '/admin/units';
      case  'Accounts':
        return '/admin/accounts';
      case 'Key Cards':
      case 'Key Card Requests':
        return '/admin/keycards';
      default:
        return '';
    }
  }
}
