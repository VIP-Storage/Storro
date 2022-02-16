import {Component, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {PageTitleService} from "../../../../../services/page-title.service";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {storroAnimations} from "../../../../shared/animations";
import {PageHeaderAction} from "../../../../shared/components/page-header/page-header.action";
import {
  AdminKeycardRequestTableComponent
} from "../../components/admin-keycard-request-table/admin-keycard-request-table.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminKeycardsTableComponent} from "../../components/admin-keycards-table/admin-keycards-table.component";
import {KeycardsService} from "../../../../../api/backend/services/keycards.service";

@Component({
  selector: 'app-admin-keycards',
  templateUrl: './admin-keycards.component.html',
  styleUrls: ['./admin-keycards.component.scss'],
  animations: storroAnimations
})
export class AdminKeycardsComponent {

  @ViewChild('requestTableComponent') requestTableComponent?: AdminKeycardRequestTableComponent;
  @ViewChild('keycardsTableComponent') keycardsTableComponent?: AdminKeycardsTableComponent;

  searchValue: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  pageHeaderActions: PageHeaderAction[] = [
    {
      title: 'Create Key Card',
      icon: 'add',
      routerLink: '/admin/keycards/create'
    },
  ];



  constructor(private pageTitleService: PageTitleService,
              private router: Router,
              private keyCardsService: KeycardsService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(data => {
      if (!!data && data.hasOwnProperty('id')) {
          this.keyCardsService.getKeycard(data.id).subscribe(keyCard => {
            this.keycardsTableComponent?.viewKeyCard(keyCard);
          })
      }
    })
    this.pageTitleService.title = 'Key Cards';
    this.searchValue.subscribe(searchValue => {
      this.searchChanged(searchValue);
    })
  }


  updateSearchValue(value: string | null) {
    if (!!value && value.length > 0) {
      this.searchValue.next(value);
    } else {
      this.searchValue.next(null)
    }
  }

  tabChanged() {
    this.updateSearchValue(this.searchValue.value);
  }

  private searchChanged(searchValue: string|null) {
    if (this.requestTableComponent) {
      console.log('Sending search value to component', this.requestTableComponent);
      this.requestTableComponent.updateSearchValue(searchValue);
    } else if (this.keycardsTableComponent) {
      console.log('Sending search value to component', this.keycardsTableComponent);
      this.keycardsTableComponent.updateSearchValue(searchValue);
    }
  }
}
