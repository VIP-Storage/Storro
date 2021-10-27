import {Component, OnInit} from '@angular/core';
import {PageTitleService} from "../../../../services/page-title.service";

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {
  }

  ngOnInit(): void {
    this.pageTitleService.title = 'Dashboard';
  }

}
