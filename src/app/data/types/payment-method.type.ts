import {PaymentMethodType} from "../enums";

export interface PaymentMethod {
  type: PaymentMethodType;
  current: boolean;
  identifier: string;
  expiry?: string;
  name?: string;
}
