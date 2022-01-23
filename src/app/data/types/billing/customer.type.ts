export interface Customer {
  id: string;
  object: string;
  address?: any;
  balance: number;
  created: number;
  currency?: any;
  default_source?: any;
  delinquent: boolean;
  description?: any;
  discount?: any;
  email: string;
  invoice_prefix: string;
  invoice_settings: {
    custom_fields?: any;
    default_payment_method?: any;
    footer?: any;
  }
  livemode: boolean;
  metadata: { [key: string]: any };
  name?: any;
  next_invoice_sequence: number;
  phone?: any;
  preferred_locales: any[];
  shipping?: any;
  tax_exempt: string;
}
