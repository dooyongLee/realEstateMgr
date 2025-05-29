import { Contract } from './contract';

export type CustomerType = 'buyer' | 'tenant';
export type CustomerStatus = 'active' | 'inactive';

export interface Customer {
  id: number;
  name: string;
  type: CustomerType;
  phone: string;
  email: string;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
  activeContracts?: Contract[];
  completedContracts?: Contract[];
} 