import {Role} from "../enums";

export interface User {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  stripeID: string;
  emailValidated: boolean;
  sharedAccessCode: string;
}
