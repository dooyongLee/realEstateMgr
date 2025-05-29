export type PropertyType = 'sale' | 'rent' | 'monthly';
export type PropertyStatus = 'available' | 'sold';

export interface Property {
  id: number;
  title: string;
  type: PropertyType;
  price: number;
  address: string;
  description: string;
  status: PropertyStatus;
  createdAt: string;
  updatedAt: string;
  images?: string[];
} 