export interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  size: string;
  location: string;
  status: PropertyStatus;
  description: string;
  features: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export type PropertyStatus = '판매중' | '계약중' | '판매완료';

export interface PropertyStats {
  total: number;
  forSale: number;
  inContract: number;
  sold: number;
  trends: {
    total: { value: number; isPositive: boolean };
    forSale: { value: number; isPositive: boolean };
    inContract: { value: number; isPositive: boolean };
    sold: { value: number; isPositive: boolean };
  };
}

export interface PropertyFormData {
  title: string;
  type: string;
  price: number;
  size: string;
  location: string;
  description: string;
  features: string[];
  images: string[];
}
