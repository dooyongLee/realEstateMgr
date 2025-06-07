export interface SearchOption {
  value: string;
  label: string;
}

export interface SearchCondition {
  name: string;
  label: string;
  type: 'select' | 'text' | 'date';
  options?: SearchOption[];
  defaultValue?: string;
} 