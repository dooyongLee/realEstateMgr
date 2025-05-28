import { Chip, ChipProps } from '@mui/material';

interface StatusBadgeProps extends Omit<ChipProps, 'color'> {
  status: 'success' | 'error' | 'warning' | 'info' | 'default';
  label: string;
}

const statusConfig = {
  success: {
    color: 'success' as const,
    icon: '✓',
  },
  error: {
    color: 'error' as const,
    icon: '✕',
  },
  warning: {
    color: 'warning' as const,
    icon: '!',
  },
  info: {
    color: 'info' as const,
    icon: 'i',
  },
  default: {
    color: 'default' as const,
    icon: '•',
  },
};

const StatusBadge = ({ status, label, ...props }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Chip
      label={label}
      color={config.color}
      size="small"
      icon={<span>{config.icon}</span>}
      {...props}
    />
  );
};

export default StatusBadge; 