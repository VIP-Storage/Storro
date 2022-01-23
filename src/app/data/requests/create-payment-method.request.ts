export interface CreatePaymentMethodRequest {
  name: string;
  cardID: string;
  sourceID: string;
  type: string;
  readableID: string;
  expires?: string;
}
