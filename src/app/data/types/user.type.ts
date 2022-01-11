import {Role} from "../enums";

export interface User {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  email: string;
  role: Role;
}
