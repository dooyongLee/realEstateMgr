import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const ContractLayout = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        계약 관리
      </Typography>
      <Outlet />
    </Box>
  );
};

export default ContractLayout;
