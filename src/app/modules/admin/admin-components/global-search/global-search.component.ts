import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable, switchMap} from "rxjs";
import {startWith} from "rxjs/operators";
import {SearchService} from "../../../../api/backend/services/search.service";
import {UnifiedSearchResult} from "../../../../data/types/search";
import {SearchType} from "../../../../data/enums";
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

  navigate(result: UnifiedSearchResult) {
    switch (result.type) {
      case SearchType.KeyCards:
        return this.router.navigateByUrl(`/admin/keycards/${result.data.id}`)
      case SearchType.Users:
        return this.router.navigateByUrl('/admin/users');
      case SearchType.Accounts:
        return this.router.navigateByUrl('/admin/accounts');
      case SearchType.Tenants:
        return this.router.navigateByUrl('/admin/users');
      case SearchType.Units:
        return this.router.navigateByUrl(`/admin/unit/${result.data.id}`)
      default:
        return null;
    }
  }
}
