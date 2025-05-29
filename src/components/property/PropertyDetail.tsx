import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Chip } from '@mui/material';
import { Property } from '@/types/property';
import { mockProperties } from '@/mocks/properties';
import DetailLayout from '@/components/layout/DetailLayout';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    // 실제로는 API 호출로 대체
    const foundProperty = mockProperties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
    }
  }, [id]);

  if (!property) {
    return (
      <DetailLayout title="매물 상세">
        <Typography>매물을 찾을 수 없습니다.</Typography>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout 
      title={property.name}
      backUrl="/properties"
      onEdit={() => console.log('Edit property:', property.id)}
      onDelete={() => console.log('Delete property:', property.id)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>기본 정보</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ mb: 1 }}>유형: {property.type}</Typography>
            <Typography sx={{ mb: 1 }}>가격: {property.price.toLocaleString()}원</Typography>
            <Typography sx={{ mb: 1 }}>면적: {property.area}㎡</Typography>
            <Typography sx={{ mb: 1 }}>층수: {property.floor}층</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>특징</Typography>
          <Box 
            sx={{ 
              mt: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1
            }}
          >
            {property.features.map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                sx={{ 
                  mr: 1,
                  mb: 1,
                  height: '32px'
                }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      {property.description && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            상세 설명
          </Typography>
          <Typography>
            {property.description}
          </Typography>
        </Box>
      )}

      {property.images && property.images.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            매물 사진
          </Typography>
          <Grid container spacing={2}>
            {property.images.map((image, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  component="img"
                  src={image}
                  alt={`매물 사진 ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: 1
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </DetailLayout>
  );
};

export default PropertyDetail; 