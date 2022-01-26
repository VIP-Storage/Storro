import {EmergencyContact} from "./emergency-contact.type";
import {MailingAddress} from "./mailing-address.type";
import {DriversLicense} from "./drivers-license.type";
import {User} from "../user.type";

export interface Account {
  id: string;
  accountHolder: User;
  accountHolderID: number;
  mailingAddress: MailingAddress;
  driversLicense: DriversLicense;
  emergencyContact: EmergencyContact;
}
