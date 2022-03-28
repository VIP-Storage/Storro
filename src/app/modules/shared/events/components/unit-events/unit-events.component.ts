import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DoorEvent, MotionEvent, Unit} from "../../../../../data";
import {UnitEventsService} from "../../../../../api/backend/services/unit-events.service";
import {BehaviorSubject, Observable, Subject, switchMap} from "rxjs";
import {filter, map, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-unit-events',
  templateUrl: './unit-events.component.html',
  styleUrls: ['./unit-events.component.scss']
})
export class UnitEventsComponent implements OnInit, OnDestroy {

  @Input() set unit(newValue: Unit|null) {
    if (!!newValue) {
      this.$unit.next(newValue);
    }
  }

  mode: 'door' | 'motion' = 'door';
  motionEvents: Observable<MotionEvent[]>;
  doorEvents: Observable<DoorEvent[]>;

  private destroyed = new Subject<boolean>();
  private $unit = new BehaviorSubject<Unit|undefined>(undefined);

  constructor(private unitEventsService: UnitEventsService) {
    this.motionEvents = this.$unit.pipe(
      takeUntil(this.destroyed),
      filter(unit => !!unit),
      switchMap(unit => this.unitEventsService.getMotionEvents(0, 5, unit)),
      map(response => response.items)
    );

    this.doorEvents = this.$unit.pipe(
      takeUntil(this.destroyed),
      filter(unit => !!unit),
      switchMap(unit => this.unitEventsService.getDoorEvents(0, 5, unit)),
      map(response => response.items)
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroyed.next(true);
  }


  get showDoorEvents() {
    return this.mode === 'door';
  }

  get showMotionEvents() {
    return this.mode === 'motion';
  }
}
