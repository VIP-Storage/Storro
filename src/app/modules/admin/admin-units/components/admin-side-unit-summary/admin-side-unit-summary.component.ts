import {Component, Input, NgZone, OnInit} from '@angular/core';
import {Unit} from "../../../../../data/types";
import {StatusBadge} from "../../../../shared/components/status-badge/status-badge.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-side-unit-summary',
  templateUrl: './admin-side-unit-summary.component.html',
  styleUrls: ['./admin-side-unit-summary.component.scss']
})
export class AdminSideUnitSummaryComponent {

  @Input()
  unit?: Unit;

  statusBadgeValues: StatusBadge[] =  [
    {
      value: true,
      display: 'Available',
      color: 'success'
    },
    {
      value: false,
      display: 'Unavailable',
      color: 'error'
    }
  ];

  constructor(private router: Router,
              private zone: NgZone) {
  }

  viewUnit(unitID: string) {
    this.zone.run(() => {
      this.router.navigate(['admin', 'units', unitID]).then();
    });
  }
}
