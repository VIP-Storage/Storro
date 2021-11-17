export interface User {
  ownedUnits: string[];
  accessUnits: string[];
  displayName: string;
  isOwner?: boolean;
}
