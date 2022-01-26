import {Component, OnInit, Renderer2} from '@angular/core';
import {storroAnimations} from "../../../shared/animations";
import {ScriptService} from "../../../../services/script.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-client-account-setup',
  templateUrl: './client-account-setup.component.html',
  styleUrls: ['./client-account-setup.component.scss'],
  animations: storroAnimations
})
export class ClientAccountSetupComponent implements OnInit {

  scriptLoaded: boolean = false;

  private googleMapsKey = environment.googleMapsKey;

  constructor(private scriptService: ScriptService,
              private renderer: Renderer2) {
    const scriptElement = this.scriptService.loadScript(this.renderer, `https://maps.googleapis.com/maps/api/js?libraries=places&key=${this.googleMapsKey}`);

    scriptElement.onload = () => {
      this.scriptLoaded = true;
    }

    scriptElement.onerror = () => {
      console.error('Could not load the Google API Script!');
    }
  }

  ngOnInit(): void {
  }

}
