export interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  createdAt: Date;
  readableID: string;
  expires: string;
}
