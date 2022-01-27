import {BillStatus} from "../enums";
import {PaymentMethod} from "./payment-method.type";

export interface BillingHistoryType {
  date: Date;
  amount: number;
  status: BillStatus;
  paymentMethod: PaymentMethod;
}
