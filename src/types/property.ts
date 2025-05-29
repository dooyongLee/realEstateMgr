export type PropertyType = 'APARTMENT' | 'OFFICETEL' | 'HOUSE' | 'COMMERCIAL';
export type PropertyStatus = 'available' | 'sold';

export interface Property {
  id: string;
  type: PropertyType;
  name: string;
  price: number;
  area: number;
  floor: number;
  features: string[];
  address: string;
  description?: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
} 