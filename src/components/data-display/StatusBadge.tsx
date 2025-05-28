import React from 'react';
import { Box, Typography } from '@mui/material';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'error' | 'success' | 'warning' | 'info';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'default' }) => {
  const getColor = () => {
    switch (variant) {
      case 'error':
        return { bg: 'error.lighter', text: 'error.dark' };
      case 'success':
        return { bg: 'success.lighter', text: 'success.dark' };
      case 'warning':
        return { bg: 'warning.lighter', text: 'warning.dark' };
      case 'info':
        return { bg: 'info.lighter', text: 'info.dark' };
      default:
        return { bg: 'grey.100', text: 'text.primary' };
    }
  };

  const colors = getColor();

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1,
        py: 0.5,
        borderRadius: 1,
        bgcolor: colors.bg,
        color: colors.text,
        fontWeight: 600,
        fontSize: '0.75rem',
        lineHeight: 1.2,
      }}
    >
      {status}
    </Box>
  );
};

export default StatusBadge; 