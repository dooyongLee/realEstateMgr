import { Grid, Typography, Box } from '@mui/material';
import StatsCard from '@/components/common/StatsCard';
import GridContainer from '@/components/common/GridContainer';
import {
  Home as HomeIcon,
  Sell as SellIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

// 임시 목업 데이터
const mockStats = {
  total: 45,
  forSale: 18,
  forRent: 27,
  trends: {
    total: { value: 8, isPositive: true },
    forSale: { value: 3, isPositive: true },
    forRent: { value: 5, isPositive: true },
  },
};

const PropertyStats = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <GridContainer>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="전체 매물"
            value={mockStats?.total?.toString() || '0'}
            icon={<HomeIcon />}
            color="#1976d2"
            trend={mockStats?.trends?.total}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="매매"
            value={mockStats?.forSale?.toString() || '0'}
            icon={<SellIcon />}
            color="#ed6c02"
            trend={mockStats?.trends?.forSale}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="전세/월세"
            value={mockStats?.forRent?.toString() || '0'}
            icon={<AssignmentIcon />}
            color="#2e7d32"
            trend={mockStats?.trends?.forRent}
          />
        </Grid>
      </GridContainer>
    </Box>
  );
};

export default PropertyStats; 