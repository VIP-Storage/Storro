import {User} from "../user.type";
import {KeycardRequestState} from "../../enums";

export interface KeycardRequest {
  id: string;
  requestedBy: User;
  requestedByID: number;
  approvedBy: User;
  approvedByID: number;
  deniedBy: User;
  deniedByID: number;
  state: KeycardRequestState;
  approvedOn: Date;
  deniedOn: Date;
  requestedOn: Date;
  comments: string;
  denialReason?: string;
  name?: string;
}
