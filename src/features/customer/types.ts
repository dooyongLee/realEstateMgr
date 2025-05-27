export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: CustomerType;
  status: CustomerStatus;
  address: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomerType = '매수희망' | '매도희망' | '임대희망' | '임대인';

export type CustomerStatus = '활성' | '비활성';

export interface CustomerStats {
  total: number;
  buyers: number;
  sellers: number;
  renters: number;
  trends: {
    total: { value: number; isPositive: boolean };
    buyers: { value: number; isPositive: boolean };
    sellers: { value: number; isPositive: boolean };
    renters: { value: number; isPositive: boolean };
  };
}

export interface CustomerFormData {
  name: string;
  phone: string;
  email: string;
  type: CustomerType;
  address: string;
  note: string;
}
