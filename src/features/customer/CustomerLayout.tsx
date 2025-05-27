import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const CustomerLayout = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        고객 관리
      </Typography>
      <Outlet />
    </Box>
  );
};

export default CustomerLayout;
