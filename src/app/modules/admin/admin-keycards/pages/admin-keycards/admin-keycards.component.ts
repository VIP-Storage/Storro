import {Component} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {PageTitleService} from "../../../../../services/page-title.service";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {storroAnimations} from "../../../../shared/animations";
import {PageHeaderAction} from "../../../../shared/components/page-header/page-header.action";

@Component({
  selector: 'app-admin-keycards',
  templateUrl: './admin-keycards.component.html',
  styleUrls: ['./admin-keycards.component.scss'],
  animations: storroAnimations
})
export class AdminKeycardsComponent {
  searchValue: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  searchValueChanged: Observable<string | null>;

  pageHeaderActions: PageHeaderAction[] = [
    {
      title: 'Create Key Card',
      icon: 'add',
      routerLink: '/admin/keycards/create'
    },
  ]


  constructor(private pageTitleService: PageTitleService) {

    this.pageTitleService.title = 'Key Cards';
    this.searchValueChanged = this.searchValue.asObservable().pipe(
      debounceTime(150),
      distinctUntilChanged()
    );
  }


  updateSearchValue(value: string | null) {
    if (!!value && value.length > 0) {
      this.searchValue.next(value);
    } else {
      this.searchValue.next(null)
    }
  }
}
