import { Grid } from '@mui/material';
import StatsCard from '@/components/stats/StatsCard';
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  PersonOff as PersonOffIcon,
  Person as PersonIcon,
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
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="전체 고객"
          value={mockStats.total.toString()}
          icon={PeopleIcon}
          trend={mockStats.trends.total}
          description="전체 고객 수"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="활성 고객"
          value={mockStats.active.toString()}
          icon={PersonIcon}
          trend={mockStats.trends.active}
          description="활성 고객 수"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="비활성 고객"
          value={mockStats.inactive.toString()}
          icon={PersonOffIcon}
          trend={mockStats.trends.inactive}
          description="비활성 고객 수"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="신규 고객"
          value={mockStats.new.toString()}
          icon={PersonAddIcon}
          trend={mockStats.trends.new}
          description="신규 고객 수"
        />
      </Grid>
    </Grid>
  );
};

export default CustomerStats; 