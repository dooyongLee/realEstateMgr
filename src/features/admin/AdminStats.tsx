import { Grid } from '@mui/material';
import StatsCard from '@/components/common/StatsCard';
import GridContainer from '@/components/common/GridContainer';
import {
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

// 임시 목업 데이터
const mockStats = {
  total: 156,
  active: 98,
  inactive: 45,
  new: 13,
  trends: {
    total: { value: 8, isPositive: true },
    active: { value: 12, isPositive: true },
    inactive: { value: 3, isPositive: false },
    new: { value: 15, isPositive: true },
  },
};

export const AdminStats = () => {
  return (
    <GridContainer>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="전체 사용자"
          value={mockStats.total.toString()}
          icon={<PersonIcon sx={{ fontSize: 100, color: 'primary.main' }} />}
          color="primary.main"
          trend={mockStats.trends.total}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="활성 사용자"
          value={mockStats.active.toString()}
          icon={<AdminIcon sx={{ fontSize: 100, color: 'success.main' }} />}
          color="success.main"
          trend={mockStats.trends.active}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="비활성 사용자"
          value={mockStats.inactive.toString()}
          icon={<WarningIcon sx={{ fontSize: 100, color: 'warning.main' }} />}
          color="warning.main"
          trend={mockStats.trends.inactive}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="관리자"
          value={mockStats.new.toString()}
          icon={<SecurityIcon sx={{ fontSize: 100, color: 'info.main' }} />}
          color="info.main"
          trend={mockStats.trends.new}
        />
      </Grid>
    </GridContainer>
  );
};

export default AdminStats; 