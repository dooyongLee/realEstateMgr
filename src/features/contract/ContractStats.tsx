import { Grid } from '@mui/material';
import StatsCard from '@/components/common/StatsCard';
import GridContainer from '@/components/common/GridContainer';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { contractStats } from '../../mocks/contracts';

const ContractStats = () => {
  return (
    <GridContainer>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="전체 계약"
          value={contractStats.total.toString()}
          icon={<AssignmentIcon />}
          color="#1976d2"
          trend={contractStats.trends.total}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="진행중"
          value={contractStats.ongoing.toString()}
          icon={<PendingIcon />}
          color="#ed6c02"
          trend={contractStats.trends.ongoing}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="완료"
          value={contractStats.completed.toString()}
          icon={<CheckCircleIcon />}
          color="#2e7d32"
          trend={contractStats.trends.completed}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="취소"
          value={contractStats.canceled.toString()}
          icon={<CancelIcon />}
          color="#d32f2f"
          trend={contractStats.trends.canceled}
        />
      </Grid>
    </GridContainer>
  );
};

export default ContractStats; 