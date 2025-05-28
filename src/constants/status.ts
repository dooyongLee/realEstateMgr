import { StatusColor } from '../types/common';

export const STATUS_COLORS: Record<string, StatusColor> = {
  error: { bg: 'error.lighter', text: 'error.dark' },
  success: { bg: 'success.lighter', text: 'success.dark' },
  warning: { bg: 'warning.lighter', text: 'warning.dark' },
  info: { bg: 'info.lighter', text: 'info.dark' },
  default: { bg: 'grey.100', text: 'text.primary' }
}; 