import { Box } from '@mui/material';
import PropertyStats from './PropertyStats';
import PropertyList from './PropertyList';

const PropertyPage = () => {
  return (
    <Box>
      <PropertyStats />
      <PropertyList />
    </Box>
  );
};

export default PropertyPage;
