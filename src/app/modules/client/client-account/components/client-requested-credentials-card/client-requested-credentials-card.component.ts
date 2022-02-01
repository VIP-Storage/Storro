import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {KeycardRequest} from "../../../../../data/types";
import {KeycardsService} from "../../../../../api/backend/services/keycards.service";
import {map, startWith, switchMap, tap} from "rxjs/operators";
import {storroAnimations} from "../../../../shared/animations";
import {StatusBadge} from "../../../../shared/components/status-badge/status-badge.type";
import {KeycardRequestState} from "../../../../../data/enums";

@Component({
  selector: 'app-client-requested-credentials-card',
  templateUrl: './client-requested-credentials-card.component.html',
  styleUrls: ['./client-requested-credentials-card.component.scss'],
  animations: storroAnimations
})
export class ClientRequestedCredentialsCardComponent implements OnInit {

  reloadData: Subject<any> = new Subject();
  requests: Observable<KeycardRequest[]>;
  totalRequests: number = 0;
  isLoadingRequests = true;
  requested: boolean = false;
  canRequest: boolean = true;
  error: string|null = null;

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

  constructor(private keycardsService: KeycardsService) {
    this.requests = this.reloadData.pipe(
      startWith({}),
      tap(() => this.isLoadingRequests = true),
      switchMap(() => keycardsService.getKeycardRequests(0, 100, 'request.id', 'DESC', null, true)),
      tap(response => this.totalRequests = response.meta.totalItems),
      map(response => response.items),
      tap(() => this.isLoadingRequests = false)
    );
  }

  ngOnInit() {
    this.reloadData.next(true);
  }

  requestKeycard() {
    this.requested = true;

    this.keycardsService.requestKeycard().subscribe(response => {
      this.requested = false;

      if (response.success) {
        this.reloadData.next(true);
        this.canRequest = false;
      } else {
        this.error = response.message;
      }
    })

  }

  get requestDisabled() {
    return !this.canRequest || this.requested;
  }
}
