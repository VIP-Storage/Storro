import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnitEventsComponent} from "./components/unit-events/unit-events.component";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import { UnitEventsCardComponent } from './components/unit-events-card/unit-events-card.component';
import { UnitEventComponent } from './components/unit-event/unit-event.component';



@NgModule({
  declarations: [
    UnitEventsComponent,
    UnitEventsCardComponent,
    UnitEventComponent,
  ],
  exports: [
    UnitEventsCardComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatListModule
  ]
})
export class EventsModule { }
