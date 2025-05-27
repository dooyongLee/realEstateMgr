import { Box } from '@mui/material';
import ContractStats from './ContractStats';
import ContractList from './ContractList';

const ContractPage = () => {
  return (
    <Box>
      <ContractStats />
      <ContractList />
    </Box>
  );
};

export default ContractPage;
