import {BillStatus} from "../enums";

export interface BillingHistoryType {
  paidOn: Date;
  amount: number;
  status: BillStatus;
  paymentMethod: any;
}
