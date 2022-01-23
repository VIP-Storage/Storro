export interface UnitType {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  active: boolean;
  price: number;
  billingInterval: 'day' | 'week' | 'month' | 'year';
  billingFrequency: string;
}
