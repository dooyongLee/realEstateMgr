export type PropertyType = 'APARTMENT' | 'OFFICETEL' | 'HOUSE' | 'COMMERCIAL';
export type PropertyStatus = 'available' | 'sold';

export interface Property {
  id: number;
  title: string;
  type: string;
  status: string;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
  size: number;
  maintenanceFee?: number;
  parking?: string;
  moveInDate: string;
  features: string[];
  description: string;
  images: string[];
} 