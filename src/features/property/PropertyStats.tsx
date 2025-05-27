import { Grid } from '@mui/material';
import StatCard from '@/components/common/StatCard';
import GridContainer from '@/components/common/GridContainer';
import {
  Home as HomeIcon,
  Sell as SellIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

// 임시 목업 데이터
const mockStats = {
  total: 45,
  forSale: 28,
  inContract: 12,
  sold: 5,
  trends: {
    total: { value: 15, isPositive: true },
    forSale: { value: 8, isPositive: true },
    inContract: { value: 5, isPositive: true },
    sold: { value: 2, isPositive: true },
  },
};

const PropertyStats = () => {
  return (
    <GridContainer>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="전체 매물"
          value={mockStats.total.toString()}
          icon={<HomeIcon />}
          color="#1976d2"
          trend={mockStats.trends.total}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="판매중"
          value={mockStats.forSale.toString()}
          icon={<SellIcon />}
          color="#ed6c02"
          trend={mockStats.trends.forSale}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="계약중"
          value={mockStats.inContract.toString()}
          icon={<AssignmentIcon />}
          color="#2e7d32"
          trend={mockStats.trends.inContract}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="판매완료"
          value={mockStats.sold.toString()}
          icon={<CheckCircleIcon />}
          color="#9c27b0"
          trend={mockStats.trends.sold}
        />
      </Grid>
    </GridContainer>
  );
};

export default PropertyStats; 