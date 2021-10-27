import {Component} from '@angular/core';
import {ClientSidebarItems} from "../../../../data/client-sidebar.data";
import {SidebarItem} from "../../../../data/types";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {ThemeService} from "../../../../services/theme.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  showClientNavigation = true;

  isDarkMode: Observable<boolean>;
  sidebarItems: SidebarItem[] = [];

  constructor(private unitsService: UnitsService,
              public themeService: ThemeService) {

    this.isDarkMode = this.themeService.theme.pipe(
      map(theme => theme === 'dark-theme')
    );

    if (this.showClientNavigation) {
      this.unitsService.getUnits().subscribe(clientUnits => {
        const clientUnitItems: SidebarItem[] = clientUnits.map(unit => ({
          title: unit.name,
          link: `/client/unit/${unit.id}`,
          isExternal: false,
          icon: 'house_siding'
        }))


        this.sidebarItems = [
          ...ClientSidebarItems,
          {
            title: 'Units',
            isSection: true
          },
          ...clientUnitItems
        ];
      })
    }
  }

  isSection(item: SidebarItem) {
    return !!item.isSection;
  }

  updateTheme(darkMode: boolean) {
    this.themeService.changeTheme(darkMode);
  }
}
