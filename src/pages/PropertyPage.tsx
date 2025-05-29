import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PropertyList from '@/components/property/PropertyList';
import { Property } from '@/types/property';
import { mockProperties } from '@/mocks/properties';

const PropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    // 실제로는 API 호출로 대체
    setProperties(mockProperties);
  }, []);

  const handleDelete = (id: string) => {
    // 실제로는 API 호출로 대체
    setProperties(properties.filter(property => property.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/properties/new')}
        >
          매물 등록
        </Button>
      </Box>
      <PropertyList
        properties={properties}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default PropertyPage; 