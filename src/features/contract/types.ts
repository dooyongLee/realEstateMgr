export interface Contract {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyType: string;
  propertySize: string;
  propertyLocation: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  startDate: string;
  endDate: string;
  deposit: number;
  monthlyRent: number;
  status: ContractStatus;
  description: string;
  terms: string[];
  createdAt: string;
  updatedAt: string;
}

export type ContractStatus = '진행중' | '완료' | '취소';

export interface ContractStats {
  total: number;
  ongoing: number;
  completed: number;
  canceled: number;
  trends: {
    total: { value: number; isPositive: boolean };
    ongoing: { value: number; isPositive: boolean };
    completed: { value: number; isPositive: boolean };
    canceled: { value: number; isPositive: boolean };
  };
}

export interface ContractFormData {
  propertyId: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  startDate: string;
  endDate: string;
  deposit: number;
  monthlyRent: number;
  description: string;
  terms: string[];
}
