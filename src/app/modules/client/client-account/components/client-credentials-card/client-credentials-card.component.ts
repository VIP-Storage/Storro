import { Component, OnInit } from '@angular/core';
import {KeycardsService} from "../../../../../api/backend/services/keycards.service";
import {Observable} from "rxjs";
import {Keycard} from "../../../../../data/types";
import {map, tap} from "rxjs/operators";
import {storroAnimations} from "../../../../shared/animations";

@Component({
  selector: 'app-client-credentials-card',
  templateUrl: './client-credentials-card.component.html',
  styleUrls: ['./client-credentials-card.component.scss'],
  animations: storroAnimations
})
export class ClientCredentialsCardComponent implements OnInit {

  keycards: Observable<Keycard[]>;
  totalKeycards: number = 0;
  isLoadingKeycards = true;

  constructor(private keycardsService: KeycardsService) {
    this.keycards =  keycardsService.getKeycards(0, 100, 'keycard.id', 'DESC', null, true).pipe(
      tap(response => this.totalKeycards = response.meta.totalItems),
      map(response => response.items),
      tap(() => this.isLoadingKeycards = false)
    );
  }

  ngOnInit(): void {
  }

}
