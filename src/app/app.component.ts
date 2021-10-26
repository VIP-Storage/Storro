import {Component, HostBinding, OnInit} from '@angular/core';
import {ThemeService} from "./services/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Storro';
  isOpen = true;

  @HostBinding('class') public cssClass!: string;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.theme.subscribe((theme: string) => {
      this.cssClass = theme;
    });
  }
}
