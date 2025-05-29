import { FC } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown, AttachMoney, Home } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: FC<StatCardProps> = ({ title, value, icon, color, trend }) => {
  return (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -10,
          right: -10,
          opacity: 0.1,
          transform: 'rotate(30deg)',
        }}
      >
        {icon}
      </Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div" sx={{ mb: 1 }}>
        {value}
      </Typography>
      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
          {trend.isPositive ? (
            <TrendingUp color="success" sx={{ mr: 1 }} />
          ) : (
            <TrendingDown color="error" sx={{ mr: 1 }} />
          )}
          <Typography
            variant="body2"
            color={trend.isPositive ? 'success.main' : 'error.main'}
          >
            {trend.value}% {trend.isPositive ? '증가' : '감소'}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

interface StatsGridProps {
  stats: {
    totalProperties: number;
    totalValue: number;
    availableProperties: number;
    soldProperties: number;
  };
}

const StatsGrid: FC<StatsGridProps> = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="전체 매물"
          value={stats.totalProperties}
          icon={<Home sx={{ fontSize: 100, color: 'primary.main' }} />}
          color="primary.main"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="총 매물 가치"
          value={`${(stats.totalValue / 100000000).toFixed(1)}억원`}
          icon={<AttachMoney sx={{ fontSize: 100, color: 'success.main' }} />}
          color="success.main"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="거래 가능 매물"
          value={stats.availableProperties}
          icon={<TrendingUp sx={{ fontSize: 100, color: 'info.main' }} />}
          color="info.main"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="거래 완료 매물"
          value={stats.soldProperties}
          icon={<TrendingDown sx={{ fontSize: 100, color: 'warning.main' }} />}
          color="warning.main"
        />
      </Grid>
    </Grid>
  );
};

export default StatsGrid; 