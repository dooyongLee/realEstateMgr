import { Property } from './property';

export type ContractType = 'sale' | 'rent' | 'monthly';
export type ContractStatus = 'active' | 'completed' | 'cancelled';

export interface Contract {
  id: number;
  property: Property;
  type: ContractType;
  startDate: string;
  endDate: string;
  deposit: number;
  rent?: number;
  status: ContractStatus;
  createdAt: string;
  updatedAt: string;
  documents?: string[];
} 