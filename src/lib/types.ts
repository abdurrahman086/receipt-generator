export interface MerchantInfo {
  name: string;
  city: string;
  address: string;
}

export interface TransactionDetail {
  date: string;
  time: string;
  paymentMethod: 'tunai' | 'visa' | 'mastercard' | 'debit' | 'ewallet';
  orderId: string;
}

export interface ProductItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface CustomerInfo {
  name?: string;
  contact?: string;
}

export interface AdditionalFee {
  id: string;
  name: string;
  amount: number;
}

export interface ReceiptData {
  merchant: MerchantInfo;
  transaction: TransactionDetail;
  products: ProductItem[];
  customer?: CustomerInfo;
  taxRate: number;
  additionalFees: AdditionalFee[];
  subtotal: number;
  tax: number;
  totalFees: number;
  total: number;
}

export type TemplateType = 'minimalis' | 'professional' | 'thermal';

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  fontFamily: string;
  showBorder: boolean;
  showLogo: boolean;
  showQrCode: boolean;
  headerStyle: 'simple' | 'decorated' | 'thermal';
  footerText: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}
