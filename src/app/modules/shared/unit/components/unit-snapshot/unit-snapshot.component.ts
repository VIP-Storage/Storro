import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit-snapshot',
  templateUrl: './unit-snapshot.component.html',
  styleUrls: ['./unit-snapshot.component.scss']
})
export class UnitSnapshotComponent implements OnInit {


  snapshotURL?: string;
  constructor() {
  }

  ngOnInit(): void {
  }

}
