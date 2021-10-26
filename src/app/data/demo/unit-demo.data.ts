import {UnitType} from "../types/unit.type";
import {UnitDataType} from "../types/unit-data.type";
import {DoorState} from "../enums/door-state.enum";
import {UnitState} from "../enums/unit-state.enum";
import {UnitAccessEntryType} from "../types/unit-access-entry.type";

const DemoUnits: UnitType[] = [
  {
    name: 'Demo Unit 1',
    location: 'Cordova, TN',
    id: 0,
  },
  {
    name: 'Demo Unit 2',
    location: 'Collierville, TN',
    id: 1,
  },
  {
    name: 'Demo Unit 3',
    location: 'Helsinki, FI',
    id: 2,
  },
  {
    name: 'Demo Unit 4',
    location: 'Austin, TX',
    id: 3
  }
]

const DemoUnitData: UnitDataType[] = [
  {
    lastAccessed: new Date(),
    lastHumidity: 78.5,
    lastTemperature: 69.0,
    doorState: DoorState.OPEN,
    state: UnitState.ALARM,
    unitID: 0,
  },
  {
    lastAccessed: new Date(),
    lastHumidity: 78.5,
    lastTemperature: 55.0,
    doorState: DoorState.CLOSED,
    state: UnitState.LOCKED,
    unitID: 1,
  },
  {
    lastAccessed: new Date(),
    lastHumidity: 0.0,
    lastTemperature: 102.0,
    doorState: DoorState.OPEN,
    state: UnitState.UNLOCKED,
    unitID: 2,
  },
  {
    lastAccessed: new Date(),
    lastHumidity: 42.7,
    lastTemperature: 88.2,
    doorState: DoorState.CLOSED,
    state: UnitState.LOCKED,
    unitID: 3
  }
]

const DemoUnitAccessData: UnitAccessEntryType[] = [
  {
    unitID: 0,
    credential: 'Bob',
    date: new Date()
  },
  {
    unitID: 0,
    credential: 'Bill',
    date: new Date()
  },
  {
    unitID: 2,
    credential: 'Justin',
    date: new Date()
  },
  {
    unitID: 3,
    credential: 'Dustin',
    date: new Date()
  },
  {
    unitID: 1,
    credential: 'Bustin',
    date: new Date()
  }
]

export const getDemoUnits = (): UnitType[] => {
  return DemoUnits;
}

export const getDemoUnitData = (unit: UnitType): UnitDataType | undefined => {
  return DemoUnitData.find(data => data.unitID === unit.id);
}

export const getDemoUnitAccessHistory = (unit?: UnitType): UnitAccessEntryType[] => {
  const accessHistory: UnitAccessEntryType[] = [];

  if (!!unit) {
    accessHistory.push(...DemoUnitAccessData.filter(data => data.unitID === unit.id))
  } else {
    accessHistory.push(...DemoUnitAccessData);
  }


  return accessHistory;
}
