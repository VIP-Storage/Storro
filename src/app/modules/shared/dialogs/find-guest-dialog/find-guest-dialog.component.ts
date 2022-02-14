import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from "rxjs/operators";
import {UserService} from "../../../../api/backend/services/user.service";
import {AccessUser} from "../../../../data/types";
import {MatSelectionListChange} from "@angular/material/list";
import {storroAnimations} from "../../animations";
import {MatDialogRef} from "@angular/material/dialog";
import {UnitsService} from "../../../../api/backend/services/units.service";

@Component({
  selector: 'app-find-guest-dialog',
  templateUrl: './find-guest-dialog.component.html',
  styleUrls: ['./find-guest-dialog.component.scss'],
  animations: storroAnimations
})
export class FindGuestDialogComponent implements AfterViewInit {

  @ViewChild('userSearch') userSearchInput!: ElementRef;

  static panelClass = 'find-guest-dialog';

  submitted: boolean = false;
  error: string|null = null;
  users!: Observable<AccessUser[]>
  totalUsers: number = 0;
  selectedUserID?: number|null = null;

  constructor(private userService: UserService,
              private unitsService: UnitsService,
              private dialogRef: MatDialogRef<FindGuestDialogComponent>) { }

  ngAfterViewInit() {
    this.users = fromEvent(this.userSearchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        switchMap(() => {
          return this.userService.searchByAccessCode(this.userSearchInput.nativeElement.value);
        }),
        map(response => {
          this.totalUsers = response.length;

          return response;
        })
      )
  }


  isSelected(user: AccessUser) {
    if (!!this.selectedUserID) {
      return this.selectedUserID === user.id;
    }

    return false;
  }

  userSelectionChange(selection: MatSelectionListChange) {
    this.selectedUserID = selection.options[0].value;
  }

  grantAccess() {

  }

  close() {
    this.dialogRef.close(null);
  }
}
