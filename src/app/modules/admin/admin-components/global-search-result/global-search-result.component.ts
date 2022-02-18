import {Component, Input, OnInit} from '@angular/core';
import {SearchType} from "../../../../data/enums";
import {UnifiedSearchResult} from "../../../../data/types/search";
import {Account, Keycard, Unit, User} from "../../../../data/types";
import {SearchService} from "../../../../api/backend/services/search.service";
import {GlobalSearchResultData} from "./global-search-result.data";

@Component({
  selector: 'app-global-search-result',
  templateUrl: './global-search-result.component.html',
  styleUrls: ['./global-search-result.component.scss']
})
export class GlobalSearchResultComponent implements OnInit {


  @Input()
  result!: UnifiedSearchResult;

  @Input()
  last: boolean = false;

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
  }

  getIcon(type: SearchType) {
    return this.searchService.getIcon(type);
  }


  getDisplayData(result: UnifiedSearchResult) {
    switch (result.type) {
      case SearchType.KeyCards:
        return GlobalSearchResultComponent.getKeyCardData(result);
      case SearchType.Accounts:
        return GlobalSearchResultComponent.getAccountData(result);
      case SearchType.Users:
        return GlobalSearchResultComponent.getUserData(result);
      case SearchType.Units:
        return GlobalSearchResultComponent.getUnitData(result);
      case SearchType.Tenants:
        return GlobalSearchResultComponent.getTenantData(result);
      default:
        return null;
    }
  }

  private static getAccountData(result: UnifiedSearchResult): GlobalSearchResultData {
    const account: Account = result.data as Account;

    return {
      type: 'Account',
      subtitleHighlightKey: [
        'accountHolderFirstName',
        'accountHolderLastName'
      ],
      subtitle: `Account Holder: ${account.accountHolder.firstName} ${account.accountHolder.lastName}`
    }
  }

  private static getUnitData(result: UnifiedSearchResult): GlobalSearchResultData {
    const unit: Unit = result.data as Unit;

    let base = {
      type: 'Unit',
      title: `${unit.id}`,
      titleHighlightKey: 'id'
    }

    if (unit.owner) {
      const tenant = unit.owner;

      return {
        ...base,
        subtitle: `Tenant: ${tenant.firstName} ${tenant.lastName}`,
        subtitleHighlightKey: [
          'ownerFirstName',
          'ownerLastName'
        ]
      }
    }

    return base;
  }

  private static getUserData(result: UnifiedSearchResult): GlobalSearchResultData {
    const user: User = result.data as User;

    return {
      title: `${user.firstName} ${user.lastName}`,
      titleHighlightKey: [
        'firstName',
        'lastName'
      ],
      subtitle: `Email Address: ${user.email}`,
      subtitleHighlightKey: 'email',
      type: 'User'
    }
  }

  private static getTenantData(result: UnifiedSearchResult): GlobalSearchResultData {
    const user: User = result.data as User;

    return {
      title: `Tenant ${user.firstName} ${user.lastName}`,
      titleHighlightKey: [
        'ownerFirstName',
        'ownerLastName'
      ],
      subtitle: `Email Address: ${user.email}`,
      subtitleHighlightKey: 'email',
      type: 'Tenant'
    }
  }

  private static getKeyCardData(result: UnifiedSearchResult): GlobalSearchResultData {
    const keyCard: Keycard = result.data as Keycard;

     return {
       title: keyCard.id,
       titleHighlightKey: 'id',
       subtitle: `Owner: ${keyCard.owner.firstName} ${keyCard.owner.lastName}`,
       subtitleHighlightKey: [
         'ownerFirstName',
         'ownerLastName'
       ],
       type: 'Key Card'
     }
  }
}
