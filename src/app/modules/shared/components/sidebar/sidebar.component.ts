import { Component, OnInit } from '@angular/core';
import {ClientSidebarItems} from "../../../../data/client-sidebar.data";
import {SidebarItem} from "../../../../data/types/sidebar-item.type";
import {UnitsService} from "../../../../api/backend/services/units.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showClientNavigation = true;

  sidebarItems: SidebarItem[] = [];

  constructor(private unitsService: UnitsService) {
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

  ngOnInit(): void {
  }

  isSection(item: SidebarItem) {
    return !!item.isSection;
  }
}
