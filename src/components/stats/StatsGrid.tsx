import React from 'react';
import { Box } from '@mui/material';
import StatsCard from './StatsCard';

interface Stat {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  trend: {
    value: number;
    isPositive: boolean;
  };
}

interface StatsGridProps {
  stats: Stat[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { 
        xs: '1fr', 
        sm: '1fr 1fr', 
        md: '1fr 1fr 1fr 1fr' 
      }, 
      gap: 3, 
      mb: 4 
    }}>
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </Box>
  );
};

export default StatsGrid; 