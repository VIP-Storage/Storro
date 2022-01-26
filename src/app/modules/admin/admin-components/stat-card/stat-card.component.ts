import {Component, Input} from '@angular/core';
import {Stat} from "../../../../data/types";

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent {

  @Input()
  stat!: Stat;

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
}
