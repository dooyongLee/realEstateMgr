import { Property } from './property';

export type ContractType = 'SALE' | 'LEASE' | 'RENT';
export type ContractStatus = 
  | 'DRAFT'           // 초안
  | 'PENDING_REVIEW'  // 검토 대기
  | 'UNDER_REVIEW'    // 검토 중
  | 'APPROVED'        // 승인됨
  | 'SIGNED'          // 서명 완료
  | 'COMPLETED'       // 완료
  | 'CANCELLED'       // 취소됨
  | 'EXPIRED';        // 만료됨

export interface Contract {
  id: number;
  propertyId: number;
  customerId: number;
  type: ContractType;
  status: ContractStatus;
  startDate: string;
  endDate: string;
  price: number;
  deposit: number;
  monthlyRent?: number;
  commission: number;
  description: string;
  terms: string[];
  documents: string[];
  createdAt: string;
  updatedAt: string;
  signedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelledReason?: string;
  createdBy: number;
  updatedBy: number;
  notes: string;
}

export interface ContractFormData {
  propertyId: number;
  customerId: number;
  type: ContractType;
  startDate: Date | null;
  price: number;
  deposit: number;
  monthlyRent?: number;
  commission: number;
  description: string;
  terms: string[];
  documents: File[];
  notes: string;
} 