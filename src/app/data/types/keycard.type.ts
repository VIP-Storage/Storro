import {User} from "./user.type";

export interface Keycard {
  id: string;
  cardCode: number;
  facilityCode: number;
  owner: User;
}
