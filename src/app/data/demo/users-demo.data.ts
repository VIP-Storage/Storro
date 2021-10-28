import {User} from "../types/user.type";
import {UnitType} from "../types";

const UsersDemoData: User[] = [
  {
    displayName: 'Storry Hardlock',
    ownedUnits: [2],
    accessUnits: [3, 0]
  },
  {
    displayName: 'Rollo P. Door',
    ownedUnits: [0],
    accessUnits: [2]
  },
  {
    displayName: 'Moe Tionsens',
    ownedUnits: [3],
    accessUnits: [1, 0]
  },
  {
    displayName: 'Conta C. Treader',
    ownedUnits: [1],
    accessUnits: [0]
  }
]

export const getDemoOwnerForUnit = (unit: UnitType): User|undefined => {
  return UsersDemoData.find(user => user.ownedUnits.includes(unit.id));
}

export const getDemoAccessibleUsersForUnit = (unit: UnitType): User[] => {
  return UsersDemoData.filter(user => user.accessUnits.includes(unit.id));
}
