import { Grid } from '@mui/material';
import StatsCard from '@/components/common/StatsCard';
import GridContainer from '@/components/common/GridContainer';
import {
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';

// 임시 목업 데이터
const mockStats = {
  properties: {
    total: 24,
    trend: { value: 12, isPositive: true },
  },
  contracts: {
    total: 18,
    trend: { value: 8, isPositive: true },
  },
  customers: {
    total: 156,
    trend: { value: 15, isPositive: true },
  },
  revenue: {
    total: '2.4억',
    trend: { value: 20, isPositive: true },
  },
};

const DashboardStats = () => {
  return (
    <GridContainer>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="전체 매물"
          value={mockStats.properties.total.toString()}
          icon={<HomeIcon sx={{ fontSize: 100, color: 'primary.main' }} />}
          color="primary.main"
          trend={mockStats.properties.trend}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="진행중인 계약"
          value={mockStats.contracts.total.toString()}
          icon={<AssignmentIcon sx={{ fontSize: 100, color: 'warning.main' }} />}
          color="warning.main"
          trend={mockStats.contracts.trend}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="전체 고객"
          value={mockStats.customers.total.toString()}
          icon={<PeopleIcon sx={{ fontSize: 100, color: 'success.main' }} />}
          color="success.main"
          trend={mockStats.customers.trend}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="총 수익"
          value={mockStats.revenue.total}
          icon={<MoneyIcon sx={{ fontSize: 100, color: 'info.main' }} />}
          color="info.main"
          trend={mockStats.revenue.trend}
        />
      </Grid>
    </GridContainer>
  );
};

export default DashboardStats; 