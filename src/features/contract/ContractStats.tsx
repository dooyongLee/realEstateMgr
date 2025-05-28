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
  total: 24,
  ongoing: 8,
  completed: 14,
  canceled: 2,
  trends: {
    total: { value: 12, isPositive: true },
    ongoing: { value: 5, isPositive: true },
    completed: { value: 8, isPositive: true },
    canceled: { value: 3, isPositive: false },
  },
};

const ContractStats = () => {
  return (
    <GridContainer>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="전체 계약"
          value={mockStats.total.toString()}
          icon={<AssignmentIcon />}
          color="#1976d2"
          trend={mockStats.trends.total}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="진행중"
          value={mockStats.ongoing.toString()}
          icon={<PendingIcon />}
          color="#ed6c02"
          trend={mockStats.trends.ongoing}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="완료"
          value={mockStats.completed.toString()}
          icon={<CheckCircleIcon />}
          color="#2e7d32"
          trend={mockStats.trends.completed}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="취소"
          value={mockStats.canceled.toString()}
          icon={<CancelIcon />}
          color="#d32f2f"
          trend={mockStats.trends.canceled}
        />
      </Grid>
    </GridContainer>
  );
};

export default ContractStats; 