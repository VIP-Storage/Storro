import { Component, OnInit } from '@angular/core';
import {ClientSidebarItems} from "../../../../data/client-sidebar.data";
import {SidebarItem} from "../../../../data/types/sidebar-item.type";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  showClientNavigation = true;

  sidebarItems: SidebarItem[] = [];

  constructor() {
    if (this.showClientNavigation) {
      this.sidebarItems = ClientSidebarItems;
    }
  }

  ngOnInit(): void {
  }
}
