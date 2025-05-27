import { Grid } from '@mui/material';
import StatCard from '@/components/common/StatCard';
import GridContainer from '@/components/common/GridContainer';
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
    <GridContainer>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="전체 고객"
          value={mockStats.total.toString()}
          icon={<PeopleIcon />}
          color="#1976d2"
          trend={mockStats.trends.total}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="활성 고객"
          value={mockStats.active.toString()}
          icon={<PersonIcon />}
          color="#2e7d32"
          trend={mockStats.trends.active}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="비활성 고객"
          value={mockStats.inactive.toString()}
          icon={<PersonOffIcon />}
          color="#ed6c02"
          trend={mockStats.trends.inactive}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="신규 고객"
          value={mockStats.new.toString()}
          icon={<PersonAddIcon />}
          color="#9c27b0"
          trend={mockStats.trends.new}
        />
      </Grid>
    </GridContainer>
  );
};

export default CustomerStats; 