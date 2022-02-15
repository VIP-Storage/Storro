import {Component, HostBinding, Input} from '@angular/core';
import {Unit, User} from "../../../../../data/types";
import {UserService} from "../../../../../api/backend/services/user.service";
import {BehaviorSubject, of, switchMap} from "rxjs";
import {storroAnimations} from "../../../animations";
import {RequestKeyCardComponent} from "../../../../client/dialogs/request-key-card/request-key-card.component";
import {MatDialog} from "@angular/material/dialog";
import {FindGuestDialogComponent} from "../../../dialogs/find-guest-dialog/find-guest-dialog.component";
import {UnitsService} from "../../../../../api/backend/services/units.service";

@Component({
  selector: 'app-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss'],
  animations: storroAnimations
})
export class AccessCardComponent {

  @Input()
  @HostBinding('class.show-borders')
  showBorders: boolean = false;

  userAccessCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  @Input()
  showRequestButton: boolean = true;

  @Input()
  @HostBinding('class.show-background')
  showBackground: boolean = true;

  @Input()
  set unit(unit: Unit|null) {
    if (!!unit) {
      this._unit = unit;
      this.fetchGuests();
    }
  }

  guests: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  private _unit?: Unit;

  constructor(private userService: UserService,
              private unitService: UnitsService,
              private matDialog: MatDialog) { }

  private fetchGuests() {
    if (!!this._unit && !!this._unit?.guests) {
      this.guests.next(this._unit?.guests);
      this.userAccessCount.next(this._unit?.guests.length);
    }
  }

  requestKeycard() {
    this.matDialog.open(RequestKeyCardComponent, {
      panelClass: RequestKeyCardComponent.panelClass
    });
  }

  addUser() {
    this.matDialog.open(FindGuestDialogComponent, {
      panelClass: FindGuestDialogComponent.panelClass,
      data: this._unit
    }).afterClosed().pipe(
      switchMap(response => {
        if (!!response && !!this._unit?.id) {
          return this.unitService.getUnit(this._unit?.id)
        }

        return of(null)
      })
    ).subscribe(nullOrUnit => {
      if (!!nullOrUnit) {
        this.unit = nullOrUnit as Unit;
      }
    })
  }

  isOwner(user: User) {
    return this._unit?.ownerID === user.id;
  }

  revokeAccess(user: User) {
   if (!!this._unit) {
     this.unitService.removeUserAccess(user.id, this._unit.id).pipe(
       switchMap(response => {
         if (response.success && !!this._unit?.id) {
           return this.unitService.getUnit(this._unit?.id)
         }

         return of(null)
       })
     ).subscribe(nullOrUnit => {
       if (!!nullOrUnit) {
         this.unit = nullOrUnit as Unit;
       }
     })
   }
  }
}
