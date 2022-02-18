import {Component} from '@angular/core';
import {SearchService} from "../../../../api/backend/services/search.service";
import {PageTitleService} from "../../../../services/page-title.service";

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent {

  disableIndexAllButton = false;
  disableIndexUsersButton = false;
  disableIndexTenantsButton = false;
  disableIndexAccountsButton = false;
  disableIndexUnitsButton = false;
  disableIndexKeyCardsButton = false;

  constructor(private searchService: SearchService, private pageTitleService: PageTitleService) {
    this.pageTitleService.title = 'Settings';
  }


  forceIndexAll() {
    this.disableIndexAllButton = true;
    this.searchService.forceIndexAll().subscribe(result => {
      this.disableIndexAllButton = !result
    });
  }

  forceIndexUsers() {
    this.disableIndexUsersButton = true;
    this.searchService.forceIndexUsers().subscribe(result => {
      this.disableIndexUsersButton = !result
    });
  }

  forceIndexAccounts() {
    this.disableIndexAccountsButton = true;
    this.searchService.forceIndexAccounts().subscribe(result => {
      this.disableIndexAccountsButton = !result
    });
  }

  forceIndexUnits() {
    this.disableIndexUnitsButton = true;
    this.searchService.forceIndexUnits().subscribe(result => {
      this.disableIndexUnitsButton = !result
    });
  }

  forceIndexKeyCards() {
    this.disableIndexKeyCardsButton = true;
    this.searchService.forceIndexKeyCards().subscribe(result => {
      this.disableIndexKeyCardsButton = !result
    });
  }

  forceIndexTenants() {
    this.disableIndexTenantsButton = true;
    this.searchService.forceIndexTenants().subscribe(result => {
      this.disableIndexTenantsButton = !result
    });
  }
}
