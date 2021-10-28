import {PaymentMethod} from "../types";
import {PaymentMethodType} from "../enums";

const PaymentMethodData: PaymentMethod[] = [
  {
    name: "Lin's Company Visa",
    type: PaymentMethodType.VISA,
    identifier: "3125",
    current: true,
    expiry: '02/25',
  },
  {
    name: "Bob's PayPal",
    type: PaymentMethodType.PAYPAL,
    identifier: "bobp1999@yahoo.net",
    current: false
  },
  {
    name: "Steve's BTC Wallet",
    type: PaymentMethodType.BTC,
    identifier: "133x1234x",
    current: false
  },
  {
    name: "The MasterCard",
    type: PaymentMethodType.MASTERCARD,
    identifier: "4124",
    current: false,
    expiry: '02/27',
  },
  {
    type: PaymentMethodType.MASTERCARD,
    identifier: "4124",
    current: false,
    expiry: '02/27',
  }
]


export const getPaymentMethodDemoData = (): PaymentMethod[] => {
  return PaymentMethodData;
}
