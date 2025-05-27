import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        관리자
      </Typography>
      <Outlet />
    </Box>
  );
};

export default AdminLayout;
