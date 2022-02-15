import {Component} from '@angular/core';
import {Observable, Subject, switchMap} from "rxjs";
import {Keycard, KeycardRequest} from "../../../../../data/types";
import {KeycardsService} from "../../../../../api/backend/services/keycards.service";
import {map, startWith, tap} from "rxjs/operators";
import {RequestKeyCardComponent} from "../../../dialogs/request-key-card/request-key-card.component";
import {MatDialog} from "@angular/material/dialog";
import {StatusBadge} from "../../../../shared/components/status-badge/status-badge.type";
import {KeycardRequestState} from "../../../../../data/enums";
import {storroAnimations} from "../../../../shared/animations";
import {PageTitleService} from "../../../../../services/page-title.service";

@Component({
  selector: 'app-client-credentials',
  templateUrl: './client-credentials.component.html',
  styleUrls: ['./client-credentials.component.scss'],
  animations: storroAnimations
})
export class ClientCredentialsComponent {

  reloadRequests: Subject<any> = new Subject();
  requests: Observable<KeycardRequest[]>;
  totalRequests: number = 0;
  isLoadingRequests = true;

  reloadCredentials: Subject<boolean> = new Subject<boolean>();
  keycards: Observable<Keycard[]>;
  totalKeycards: number = 0;
  isLoadingKeycards = true;

  statusBadgeValues: StatusBadge[] =  [
    {
      value: KeycardRequestState.Pending,
      display: 'Pending',
      color: 'warn'
    },
    {
      value: KeycardRequestState.Denied,
      display: 'Denied',
      color: 'error'
    },
    {
      value: KeycardRequestState.Approved,
      display: 'Approved',
      color: 'success'
    }
  ];

  constructor(private keycardsService: KeycardsService,
              private pageTitleService: PageTitleService,
              private matDialog: MatDialog) {
    this.pageTitleService.title = 'Key Cards';

    this.keycards = this.reloadCredentials.pipe(
      startWith({}),
      switchMap(() => keycardsService.getKeycards(0, 100, 'keycard.id', 'DESC', null, true)),
      tap(response => this.totalKeycards = response.meta.totalItems),
      map(response => response.items),
      tap(() => this.isLoadingKeycards = false)
    );

    this.requests = this.reloadRequests.pipe(
      startWith({}),
      tap(() => this.isLoadingRequests = true),
      switchMap(() => keycardsService.getKeycardRequests(0, 100, 'request.requestedOn', 'DESC', null, true)),
      tap(response => this.totalRequests = response.meta.totalItems),
      map(response => response.items),
      tap(() => this.isLoadingRequests = false)
    );
  }

  toggleLost(keycard: Keycard) {
    this.keycardsService.updateLost(keycard, !keycard.lost).subscribe((res) => {
      if (res.success) {
        this.reloadCredentials.next(true);
      }
    })
  }


  requestKeycard() {
    this.matDialog.open(RequestKeyCardComponent, {
      panelClass: RequestKeyCardComponent.panelClass
    }).afterClosed().subscribe(response => {
      if (!!response) {
        this.reloadRequests.next(true);
      }
    })
  }
}
