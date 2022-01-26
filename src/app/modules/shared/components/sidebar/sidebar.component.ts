import {Component} from '@angular/core';
import {SidebarItem, User} from "../../../../data/types";
import {Observable} from "rxjs";
import {UserService} from "../../../../api/backend/services/user.service";
import {Role} from "../../../../data/enums";
import {SidebarService} from "../../../../api/backend/services/sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  currentUser: Observable<User>;
  currentRole: Observable<Role>;
  sidebarItems: Observable<SidebarItem[]>;

  constructor(private sidebarService: SidebarService,
              private userService: UserService) {

    this.currentUser = this.userService.currentUser;
    this.currentRole = this.userService.currentRole;
    this.sidebarItems = this.sidebarService.getSidebarItems();
  }

  isSection(item: SidebarItem) {
    return !!item.isSection;
  }

  get clientSidebarBase(): SidebarItem[] {
    return [
      {
        title: 'Dashboard',
        icon: 'grid_view',
        isExternal: false,
        link: '/client/dashboard'
      },
      {
        title: 'Billing',
        icon: 'attach_money',
        isExternal: false,
        link: '/client/billing'
      },
    ]
  }
}
