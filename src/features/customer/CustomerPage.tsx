import { Box } from '@mui/material';
import CustomerStats from './CustomerStats';
import CustomerList from './CustomerList';

const CustomerPage = () => {
  return (
    <Box>
      <CustomerStats />
      <CustomerList />
    </Box>
  );
};

export default CustomerPage;
