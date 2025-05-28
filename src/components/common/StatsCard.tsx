import { Box, Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, icon, color, trend }: StatsCardProps) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography color="text.secondary" variant="subtitle2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {value}
            </Typography>
            {trend && (
              <Typography
                variant="body2"
                color={trend.isPositive ? 'success.main' : 'error.main'}
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </Typography>
            )}
          </Box>
          {icon && (
            <Box
              sx={{
                backgroundColor: color || 'primary.main',
                borderRadius: '50%',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard; 