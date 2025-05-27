import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const PropertyLayout = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        매물 관리
      </Typography>
      <Outlet />
    </Box>
  );
};

export default PropertyLayout;
