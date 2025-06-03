import { Grid } from '@mui/material';
import StatsCard from '@/components/common/StatsCard';
import GridContainer from '@/components/common/GridContainer';
import {
  Home as HomeIcon,
  Sell as SellIcon,
  Assignment as AssignmentIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';

const PropertyStats = () => {
  return (
      <GridContainer>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="전체 매물"
            value="0"
            icon={<HomeIcon />}
            color="#1976d2"
            trend={{ value: 0, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="매매"
            value="0"
            icon={<SellIcon />}
            color="#ed6c02"
            trend={{ value: 0, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="전세"
            value="0"
            icon={<AssignmentIcon />}
            color="#2e7d32"
            trend={{ value: 0, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="월세"
            value="0"
            icon={<PendingIcon />}
            color="#1a4a51"
            trend={{ value: 0, isPositive: true }}
          />
        </Grid>
      </GridContainer>
  );
};

export default PropertyStats; 