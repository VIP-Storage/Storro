import {User} from "./user.type";

export interface UnitType {
  ownerID: number;
  guests: User[];
  armed: boolean;
  id: string;
  lastUpdated: Date;
  created: Date;
  location: string;
}
