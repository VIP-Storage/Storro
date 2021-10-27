import {BillingHistoryType} from "../types";

export interface BillingHistoryResponse {
  data: BillingHistoryType[];
  total: number;
}
