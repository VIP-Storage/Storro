import {User} from "./user.type";

export interface Unit {
  ownerID: number;
  guests?: User[];
  armed: boolean;
  id: string;
  lastUpdated: Date;
  created: Date;
  location: string;
  unitType: string;
  unitTypeName: string;
  available: boolean;
  owner?: User;
  rtspSnapshotURL?: string;
}
