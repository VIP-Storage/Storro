import {Component, OnInit, ViewChild} from '@angular/core';
import {PageTitleService} from "../../../../services/page-title.service";
import {MatDialog} from "@angular/material/dialog";
import {UnitPickerComponent} from "../../dialogs/unit-picker/unit-picker.component";
import {UnitsGridComponent} from "../../../shared/unit/components/units-grid/units-grid.component";
import {AccountsService} from "../../../../api/backend/services/accounts.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

  @ViewChild(UnitsGridComponent) unitsGridComponent?: UnitsGridComponent;

  hasAccount: Observable<boolean>;

  constructor(private pageTitleService: PageTitleService,
              private accountsService: AccountsService,
              private router: Router,
              private matDialog: MatDialog) {

    this.hasAccount = this.accountsService.getCurrentAccount().pipe(
      map(res => res.success)
    )
  }

  ngOnInit(): void {
    this.pageTitleService.title = 'Dashboard';
  }

  openUnitPicker() {
    this.matDialog.open(UnitPickerComponent, {
      panelClass: UnitPickerComponent.panelClass
    }).afterClosed().subscribe(unit => {
      if (!!unit && this.unitsGridComponent) {
        this.unitsGridComponent.reloadData();
      }
    })
  }

  actionClicked() {
    this.hasAccount.subscribe(hasAccount => {
      if (hasAccount) {
        this.openUnitPicker();
      } else {
        this.router.navigate(['client', 'account']).then();
      }
    })
  }
}
