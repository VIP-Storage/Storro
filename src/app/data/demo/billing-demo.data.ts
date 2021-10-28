import {BillingHistoryType} from "../types";
import {BillStatus} from "../enums";
import {BillingHistoryResponse} from "../response/billing-history.response";

const BillingDemoData: BillingHistoryType[] = [
  {
    paidOn: new Date("Dec 18, 2021"),
    amount: 223.49,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Jul 18, 2021"),
    amount: 222.04,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Nov 18, 2021"),
    amount: 221.26,
    status: BillStatus.PENDING,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Mar 17, 2021"),
    amount: 228.57,
    status: BillStatus.ERROR,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Sep 26, 2021"),
    amount: 227.67,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Apr 18, 2021"),
    amount: 229.86,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Feb 24, 2021"),
    amount: 222.11,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("May 30, 2021"),
    amount: 226.26,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Aug 4, 2021"),
    amount: 220.81,
    status: BillStatus.ERROR,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Sep 5, 2021"),
    amount: 221.45,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Dec 30, 2021"),
    amount: 223.29,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jan 19, 2021"),
    amount: 224.14,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jan 30, 2021"),
    amount: 232.78,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Jul 11, 2021"),
    amount: 224.91,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Sep 5, 2021"),
    amount: 222.56,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Feb 23, 2021"),
    amount: 221.70,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Sep 10, 2021"),
    amount: 227.79,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Aug 8, 2021"),
    amount: 225.17,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jul 27, 2021"),
    amount: 223.39,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Aug 19, 2021"),
    amount: 230.18,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Aug 21, 2021"),
    amount: 226.12,
    status: BillStatus.PENDING,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Dec 18, 2021"),
    amount: 227.23,
    status: BillStatus.PENDING,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Aug 31, 2021"),
    amount: 229.65,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Aug 14, 2021"),
    amount: 224.27,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("May 2, 2021"),
    amount: 220.44,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Jun 18, 2021"),
    amount: 220.31,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Oct 13, 2021"),
    amount: 222.59,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("May 26, 2021"),
    amount: 222.59,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Jun 9, 2021"),
    amount: 224.92,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Mar 19, 2021"),
    amount: 218.43,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("May 14, 2021"),
    amount: 228.25,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Apr 29, 2021"),
    amount: 219.77,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Mar 13, 2021"),
    amount: 226.58,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Sep 12, 2021"),
    amount: 223.94,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Nov 10, 2021"),
    amount: 220.53,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Sep 5, 2021"),
    amount: 220.08,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Nov 1, 2021"),
    amount: 213.39,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Feb 2, 2021"),
    amount: 224.65,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Jul 18, 2021"),
    amount: 222.83,
    status: BillStatus.PENDING,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("May 17, 2021"),
    amount: 215.66,
    status: BillStatus.PENDING,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Jul 12, 2021"),
    amount: 226.91,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jun 4, 2021"),
    amount: 222.95,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Feb 9, 2021"),
    amount: 229.47,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Dec 14, 2021"),
    amount: 229.25,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Mar 7, 2021"),
    amount: 225.93,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Mar 31, 2021"),
    amount: 221.92,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Sep 5, 2021"),
    amount: 223.26,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jun 27, 2021"),
    amount: 218.04,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Sep 16, 2021"),
    amount: 222.93,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("May 5, 2021"),
    amount: 226.09,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Jul 16, 2021"),
    amount: 220.24,
    status: BillStatus.PENDING,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Dec 6, 2021"),
    amount: 221.81,
    status: BillStatus.PENDING,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Mar 23, 2021"),
    amount: 225.62,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jul 16, 2021"),
    amount: 222.88,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Nov 29, 2021"),
    amount: 225.77,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Dec 29, 2021"),
    amount: 227.36,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Aug 25, 2021"),
    amount: 226.42,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Jan 14, 2021"),
    amount: 230.86,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Nov 27, 2021"),
    amount: 225.65,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jan 22, 2021"),
    amount: 230.90,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jan 20, 2021"),
    amount: 226.41,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Jan 19, 2021"),
    amount: 223.67,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Jan 23, 2021"),
    amount: 226.42,
    status: BillStatus.PENDING,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Apr 3, 2021"),
    amount: 225.78,
    status: BillStatus.PENDING,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Sep 1, 2021"),
    amount: 225.51,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jun 8, 2021"),
    amount: 223.38,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Sep 3, 2021"),
    amount: 222.23,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Sep 3, 2021"),
    amount: 231.34,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Oct 10, 2021"),
    amount: 221.15,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Jul 12, 2021"),
    amount: 226.81,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Sep 29, 2021"),
    amount: 218.15,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jan 3, 2021"),
    amount: 221.22,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Feb 2, 2021"),
    amount: 220.58,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Apr 30, 2021"),
    amount: 226.81,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Jul 9, 2021"),
    amount: 221.79,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Apr 10, 2021"),
    amount: 222.97,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("May 2, 2021"),
    amount: 216.88,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Nov 26, 2021"),
    amount: 222.36,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Aug 1, 2021"),
    amount: 216.52,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Aug 26, 2021"),
    amount: 220.32,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Feb 21, 2021"),
    amount: 226.84,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Jul 19, 2021"),
    amount: 215.32,
    status: BillStatus.PENDING,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Feb 12, 2021"),
    amount: 230.31,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Mar 29, 2021"),
    amount: 228.53,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jul 1, 2021"),
    amount: 229.82,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Jun 17, 2021"),
    amount: 220.66,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Nov 7, 2021"),
    amount: 226.72,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Nov 20, 2021"),
    amount: 222.98,
    status: BillStatus.PENDING,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Mar 26, 2021"),
    amount: 212.45,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jul 21, 2021"),
    amount: 219.00,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Feb 13, 2021"),
    amount: 218.25,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Jun 2, 2021"),
    amount: 231.52,
    status: BillStatus.PENDING,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Jul 19, 2021"),
    amount: 229.68,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Nov 10, 2021"),
    amount: 220.52,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Dec 26, 2021"),
    amount: 221.16,
    status: BillStatus.PENDING,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jan 8, 2021"),
    amount: 221.37,
    status: BillStatus.PAID,
    paymentMethod: "MasterCard"
  },
  {
    paidOn: new Date("Jun 23, 2021"),
    amount: 225.56,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("May 14, 2021"),
    amount: 226.06,
    status: BillStatus.PAID,
    paymentMethod: "PayPal"
  },
  {
    paidOn: new Date("Mar 13, 2021"),
    amount: 222.11,
    status: BillStatus.PAID,
    paymentMethod: "Visa"
  },
  {
    paidOn: new Date("Dec 7, 2021"),
    amount: 220.83,
    status: BillStatus.PENDING,
    paymentMethod: "Visa"
  }
]

export const getBillingDemoData = (pageSize = 30, pageNumber = 0): BillingHistoryResponse => {
  return {
    data: BillingDemoData.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    total: BillingDemoData.length
  }
}
