import { ReactElement } from 'react';

export interface Stat {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  trend: {
    value: number;
    isPositive: boolean;
  };
}

export interface SearchField {
  name: string;
  label: string;
  type: 'text' | 'select';
  options?: { value: string; label: string }[];
  tooltip?: string;
}

export type StatusVariant = 'default' | 'error' | 'success' | 'warning' | 'info';

export interface StatusColor {
  bg: string;
  text: string;
} 