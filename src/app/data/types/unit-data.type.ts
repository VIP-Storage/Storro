import {UnitState} from "../enums/unit-state.enum";
import {DoorState} from "../enums/door-state.enum";

export interface UnitDataType {
  lastHumidity: number;
  lastTemperature: number;
  lastAccessed: Date;
  state: UnitState;
  doorState: DoorState
}
