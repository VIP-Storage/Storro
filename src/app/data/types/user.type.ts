export interface User {
  ownedUnits: number[];
  accessUnits: number[];
  displayName: string;
  isOwner?: boolean;
}
