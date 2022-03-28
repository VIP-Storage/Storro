import {Component, Input} from '@angular/core';
import {DoorEvent, MotionEvent} from "../../../../../data";
import {UnitEventsService} from "../../../../../api/backend/services/unit-events.service";
import {BehaviorSubject, first} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-unit-event',
  templateUrl: './unit-event.component.html',
  styleUrls: ['./unit-event.component.scss']
})
export class UnitEventComponent {

  @Input()
  set event(event: MotionEvent | DoorEvent) {
    this.eventType = event.eventType;
    this.updateSnapshotURL(event.id);
    this._event = event;
  }

  get event() {
    return this._event!;
  }

  eventType!: 'door' | 'motion';
  snapshotURL: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private _event?: MotionEvent | DoorEvent;

  constructor(private unitEventsService: UnitEventsService,
              private domSanitizer: DomSanitizer) {
  }


  private updateSnapshotURL(eventID: string) {
    let subscribable = this.unitEventsService.getMotionEventSnapshotURL(eventID, this.domSanitizer).pipe(
      first()
    )

    if (this.eventType === 'door') {
      subscribable = this.unitEventsService.getDoorEventSnapshotURL(eventID, this.domSanitizer).pipe(
        first()
      )
    }

    subscribable.subscribe(url => this.snapshotURL.next(url));
  }
}
