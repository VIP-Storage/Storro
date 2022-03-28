import {UnitSnapshot} from "../unit-snapshot.type";

export interface DoorEvent {
  doorOpen: boolean;
  id: string;
  unitOwnerID: number;
  created: Date;
  snapshotID?: number;
  snapshot?: UnitSnapshot;
  eventType: 'door';
}
