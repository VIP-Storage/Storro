import {UnitSnapshot} from "../unit-snapshot.type";

export interface MotionEvent {
  motionTriggered: boolean;
  sensorRemoved: boolean;
  id: string;
  unitOwnerID: number;
  created: Date;
  snapshotID?: number;
  snapshot?: UnitSnapshot;
  eventType: 'motion';
}
