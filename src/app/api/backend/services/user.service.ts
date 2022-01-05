import {Injectable} from '@angular/core';
import {UnitType, User} from "../../../data/types";
import {forkJoin, Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

}
