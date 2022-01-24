import {Component, Input, Output} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  private currentSearchValue: string = '';

  @Input()
  placeholder = 'Search';

  @Output()
  searchValueChanged = new ReplaySubject<string>();

  set searchValue(newValue: string) {
    this.currentSearchValue = newValue;
    this.searchValueChanged.next(newValue);
  }

  @Output()
  get searchValue(): string {
    return this.currentSearchValue;
  }
}
