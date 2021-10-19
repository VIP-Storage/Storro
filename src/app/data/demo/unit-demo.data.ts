import {UnitType} from "../types/unit.type";
import {UnitDataType} from "../types/unit-data.type";
import {DoorState} from "../enums/door-state.enum";
import {UnitState} from "../enums/unit-state.enum";

const DemoUnits: UnitType[] = [
  {
    name: 'Demo Unit 1',
    location: 'Your Mom\'s House',
  },
  {
    name: 'Demo Unit 2',
    location: 'Your Mom\'s Mom\'s House',
  },
  {
    name: 'Demo Unit 3',
    location: 'Hell',
  },
  {
    name: 'Demo Unit 4',
    location: 'Comcast World Headquarters',
  }
]

const DemoUnitData: UnitDataType[] = [
  {
    lastAccessed: new Date(),
    lastHumidity: 78.5,
    lastTemperature: 69.0,
    doorState: DoorState.OPEN,
    state: UnitState.ALARM
  },
  {
    lastAccessed: new Date(),
    lastHumidity: 78.5,
    lastTemperature: 55.0,
    doorState: DoorState.CLOSED,
    state: UnitState.LOCKED
  },
  {
    lastAccessed: new Date(),
    lastHumidity: 0.0,
    lastTemperature: 102.0,
    doorState: DoorState.OPEN,
    state: UnitState.UNLOCKED
  },
  {
    lastAccessed: new Date(),
    lastHumidity: 42.7,
    lastTemperature: 88.2,
    doorState: DoorState.CLOSED,
    state: UnitState.LOCKED
  }
]

export const getDemoUnits = (): UnitType[] => {
  return DemoUnits;
}

export const getDemoUnitData = (unit: UnitType): UnitDataType | null => {
  const demoUnitDataIndex = DemoUnits.indexOf(unit);

  if (demoUnitDataIndex !== undefined && demoUnitDataIndex !== null) {
    return DemoUnitData[demoUnitDataIndex]
  }

  return null;
}
