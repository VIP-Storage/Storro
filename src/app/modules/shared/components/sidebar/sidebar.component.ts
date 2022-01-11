import {Component} from '@angular/core';
import {ClientSidebarItems} from "../../../../data/client-sidebar.data";
import {SidebarItem} from "../../../../data/types";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {ThemeService} from "../../../../services/theme.service";
import {Observable, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {UserService} from "../../../../api/backend/services/user.service";
import {Role} from "../../../../data/enums";
import {SidebarService} from "../../../../api/backend/services/sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isDarkMode: Observable<boolean>;
  sidebarItems: Observable<SidebarItem[]>;

  constructor(private sidebarService: SidebarService,
              private userService: UserService,
              public themeService: ThemeService) {



    this.isDarkMode = this.themeService.theme.pipe(
      map(theme => theme === 'dark-theme')
    );

    this.sidebarItems = this.sidebarService.getSidebarItems();
  }

  isSection(item: SidebarItem) {
    return !!item.isSection;
  }

  updateTheme(darkMode: boolean) {
    this.themeService.changeTheme(darkMode);
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
