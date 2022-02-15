import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Component({
  selector: 'app-client-account-grid-card',
  templateUrl: './client-account-grid-card.component.html',
  styleUrls: ['./client-account-grid-card.component.scss']
})
export class ClientAccountGridCardComponent{

  @Input()
  title?: string;

  @Input()
  subtitle?: string;

  @Input()
  style: 'PURPLE' | 'BLUE' | 'GREEN' | 'RED' | 'ORANGE' = 'PURPLE';


  @Input()
  actionIcon: string|null = null;

  @Output()
  gridTileClicked: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('click')
  clicked() {
   this.gridTileClicked.emit(this);
  }


  get backgroundOverlayClass() {
    return `${this.style.toLowerCase()}-background`;
  }

}
