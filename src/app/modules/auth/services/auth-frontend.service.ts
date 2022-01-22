import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PageTitleService} from "../../../services/page-title.service";

@Injectable({
  providedIn: 'root'
})
export class AuthFrontendService {

  private $currentTitle: BehaviorSubject<string> = new BehaviorSubject<string>('Login');
  private $showLoginBackButton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private pageTitleService: PageTitleService) { }

  get currentTitle() {
    return this.$currentTitle.asObservable();
  }

  get showLoginBackButton() {
    return this.$showLoginBackButton.asObservable();
  }

  set showLoginBack(newValue: boolean) {
    this.$showLoginBackButton.next(newValue);
  }

  set title(newTitle: string) {
    this.$currentTitle.next(newTitle);
    this.pageTitleService.title = newTitle;
  }
}
