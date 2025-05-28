import { Grid } from '@mui/material';
import StatsCard from '@/components/common/StatsCard';
import GridContainer from '@/components/common/GridContainer';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

// 임시 목업 데이터
const mockStats = {
  total: 45,
  active: 32,
  inactive: 10,
  new: 3,
  trends: {
    total: { value: 15, isPositive: true },
    active: { value: 8, isPositive: true },
    inactive: { value: 5, isPositive: false },
    new: { value: 3, isPositive: true },
  },
};

const CustomerStats = () => {
  return (
    <GridContainer>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="전체 고객"
          value={mockStats.total.toString()}
          icon={<AssignmentIcon />}
          color="#1976d2"
          trend={mockStats.trends.total}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="활성 고객"
          value={mockStats.active.toString()}
          icon={<PendingIcon />}
          color="#ed6c02"
          trend={mockStats.trends.active}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="비활성 고객"
          value={mockStats.inactive.toString()}
          icon={<CheckCircleIcon />}
          color="#2e7d32"
          trend={mockStats.trends.inactive}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="신규 고객"
          value={mockStats.new.toString()}
          icon={<CancelIcon />}
          color="#d32f2f"         
          trend={mockStats.trends.new}
        />
      </Grid>
    </GridContainer>
  );
};

export default CustomerStats; 