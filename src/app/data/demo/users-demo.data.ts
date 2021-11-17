import {UnitType, User} from "../types";

const UsersDemoData: User[] = [
  {
    displayName: 'Storry Hardlock',
    ownedUnits: ['A101'],
    accessUnits: ['F100', 'C105']
  },
  {
    displayName: 'Rollo P. Door',
    ownedUnits: ['C105'],
    accessUnits: ['A101']
  },
  {
    displayName: 'Moe Tionsens',
    ownedUnits: ['F100'],
    accessUnits: ['P118', 'C105']
  },
  {
    displayName: 'Conta C. Treader',
    ownedUnits: ['P118'],
    accessUnits: ['C105']
  }
]

export const getDemoOwnerForUnit = (unit: UnitType): User|undefined => {
  return UsersDemoData.find(user => user.ownedUnits.includes(unit.id));
}

export const getDemoAccessibleUsersForUnit = (unit: UnitType): User[] => {
  return UsersDemoData.filter(user => user.accessUnits.includes(unit.id));
}
