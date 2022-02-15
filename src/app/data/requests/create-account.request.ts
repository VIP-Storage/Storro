import {DriversLicense, EmergencyContact, MailingAddress} from "../types";

export interface CreateAccountRequest {
  mailingAddress: MailingAddress;
  driversLicense: DriversLicense;
  emergencyContact: EmergencyContact;
  personalPhoneNumber: string;
}
