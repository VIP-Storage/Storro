import {DriversLicense, EmergencyContact, MailingAddress} from "../types/accounts";

export interface CreateAccountRequest {
  mailingAddress: MailingAddress;
  driversLicense: DriversLicense;
  emergencyContact: EmergencyContact;
}
