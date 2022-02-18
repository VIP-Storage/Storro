import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable, switchMap} from "rxjs";
import {startWith} from "rxjs/operators";
import {SearchService} from "../../../../api/backend/services/search.service";
import {UnifiedSearchResult} from "../../../../data/types/search";
import {SearchType} from "../../../../data/enums";
import {Account, Keycard, Unit, User} from "../../../../data/types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements OnInit {

  searchControl = new FormControl();
  results!: Observable<UnifiedSearchResult[]>;

  constructor(private searchService: SearchService,
              private router: Router) {
  }

  ngOnInit() {
    this.results = this.searchControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.searchService.globalSearch(value))
    );
  }

  getIcon(type: SearchType) {
    return this.searchService.getIcon(type);
  }

  getDisplayData(result: UnifiedSearchResult) {
    switch (result.type) {
      case SearchType.Units:
        return `Unit - Tenant: ${(result.data as Unit).id}`;
      case SearchType.Users:
        return `User: ${(result.data as User).firstName} ${(result.data as User).lastName}`
      case SearchType.Accounts:
        return `Account - Holder: ${(result.data as Account).accountHolder.firstName} ${(result.data as Account).accountHolder.lastName}`;
      case SearchType.KeyCards:
        return `Key Card - Owner: ${(result.data as Keycard).owner.firstName} ${(result.data as Keycard).owner.lastName}`;
    }
  }

  navigate(result: UnifiedSearchResult) {
    switch (result.type) {
      case SearchType.KeyCards:
        console.log(`/admin/keycards/${result.data.id}`);
        return this.router.navigateByUrl(`/admin/keycards/${result.data.id}`)
      default:
        return null;
    }
  }
}
