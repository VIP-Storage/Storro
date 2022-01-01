import {DoorState, UnitState} from "../enums";
import {UnitAccessEntryType, UnitDataType, UnitType} from "../types";

const DemoUnits: UnitType[] = [
  {
    name: 'Demo Unit 1',
    location: 'Cordova, TN',
    id: 'C105',
  },
  {
    name: 'Demo Unit 2',
    location: 'Collierville, TN',
    id: 'M120',
  },
  {
    name: 'Demo Unit 3',
    location: 'Helsinki, FI',
    id: 'A101',
  },
  {
    name: 'Demo Unit 4',
    location: 'Austin, TX',
    id: 'F100'
  }
]

const DemoUnitData: UnitDataType[] = [
  {
    lastAccessed: new Date(),
    lastHumidity: 78.5,
    lastTemperature: 69.0,
    doorState: DoorState.OPEN,
    state: UnitState.ALARM,
    unit: 'C105',
  },
  {
    lastAccessed: new Date(),
    lastHumidity: 78.5,
    lastTemperature: 55.0,
    doorState: DoorState.CLOSED,
    state: UnitState.LOCKED,
    unit: 'M120',
  },
  {
    lastAccessed: new Date(),
    lastHumidity: 0.0,
    lastTemperature: 102.0,
    doorState: DoorState.OPEN,
    state: UnitState.UNLOCKED,
    unit: 'A101',
  },
  {
    lastAccessed: new Date(),
    lastHumidity: 42.7,
    lastTemperature: 88.2,
    doorState: DoorState.CLOSED,
    state: UnitState.LOCKED,
    unit: 'F100'
  }
]

const DemoUnitAccessData: UnitAccessEntryType[] = [
  {
    unitID: 'C105',
    credential: 'Bob',
    date: new Date()
  },
  {
    unitID: 'C105',
    credential: 'Bill',
    date: new Date()
  },
  {
    unitID: 'A101',
    credential: 'Justin',
    date: new Date()
  },
  {
    unitID: 'F100',
    credential: 'Dustin',
    date: new Date()
  },
  {
    unitID: 'M120',
    credential: 'Bustin',
    date: new Date()
  }
]

export const getDemoUnits = (): UnitType[] => {
  return DemoUnits;
}

export const getDemoUnitData = (unit: UnitType): UnitDataType | undefined => {
  return DemoUnitData.find(data => data.unit === unit.id);
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
