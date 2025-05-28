import React from 'react';
import { Card, CardContent, Typography, Box, Icon } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  trend: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: IconComponent,
  description,
  trend
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <Icon component={IconComponent} sx={{ color: 'primary.main' }} />
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {trend.value > 0 ? (
            <TrendingUp color={trend.isPositive ? 'success' : 'error'} />
          ) : (
            <TrendingDown color={trend.isPositive ? 'success' : 'error'} />
          )}
          <Typography variant="body2" color="text.secondary">
            {trend.value}% {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard; 