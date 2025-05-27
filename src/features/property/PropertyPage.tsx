import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PropertyStats from './PropertyStats';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';

const PropertyPage = () => {
  const location = useLocation();
  const isNewProperty = location.pathname.endsWith('/new');

  return (
    <Box>
      {!isNewProperty && <PropertyStats />}
      {isNewProperty ? <PropertyForm /> : <PropertyList />}
    </Box>
  );
};

export default PropertyPage;
