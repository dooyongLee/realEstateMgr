import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Chip } from '@mui/material';
import DetailLayout from '../../components/layout/DetailLayout';

// Mock data for development
const mockProperties = [
  {
    id: 1,
    title: '강남 아파트',
    type: '아파트',
    price: '12억',
    size: '120평',
    status: '판매중',
    location: '서울시 강남구',
    createdAt: '2024-03-15',
    description: '강남역 도보 5분 거리에 위치한 프리미엄 아파트입니다. 넓은 평수와 좋은 조망을 자랑합니다.',
    features: ['주차 2대', '엘리베이터', 'CCTV', '24시간 경비'],
    images: ['https://picsum.photos/800/400?random=1'],
  },
  {
    id: 2,
    title: '송파 오피스텔',
    type: '오피스텔',
    price: '8억',
    size: '80평',
    status: '계약중',
    location: '서울시 송파구',
    createdAt: '2024-03-14',
    description: '잠실역 인근의 고급 오피스텔입니다. 최신 인테리어와 편리한 교통을 제공합니다.',
    features: ['주차 1대', '엘리베이터', 'CCTV', '24시간 경비'],
    images: ['https://picsum.photos/800/400?random=2'],
  },
];

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = mockProperties.find(p => p.id === Number(id));

  if (!property) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">매물을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '판매중':
        return 'primary';
      case '계약중':
        return 'warning';
      case '판매완료':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <DetailLayout
      title={property.title}
      status={property.status}
      statusColor={getStatusColor(property.status)}
      backUrl="/properties"
      onEdit={() => console.log('Edit property:', property.id)}
      onDelete={() => console.log('Delete property:', property.id)}
    >

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
      <Box sx={{ mb: 2 }}>
        <Chip label={property.type} sx={{ mr: 1 }} />
        <Chip label={property.location} />
      </Box>
      <Typography variant="body1" paragraph>
        {property.description}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          주요 특징
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {property.features.map((feature, index) => (
            <Chip key={index} label={feature} />
          ))}
        </Box>
      </Box>
      </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h6" gutterBottom>
              매물 정보
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  가격
                </Typography>
                <Typography variant="body1">{property.price}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  면적
                </Typography>
                <Typography variant="body1">{property.size}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  등록일
                </Typography>
                <Typography variant="body1">{property.createdAt}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Typography variant="h6" gutterBottom>
              매물 사진
            </Typography>
            <Box 
              sx={{ 
                display: 'flex',
                gap: 2,
                overflowX: 'auto',
                pb: 2,
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '4px',
                  '&:hover': {
                    background: '#555',
                  },
                },
                scrollbarWidth: 'thin',
                scrollbarColor: '#888 #f1f1f1',
              }}
            >
              {property.images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`Property ${index + 1}`}
                  sx={{
                    width: { xs: 280, sm: 320, md: 360 },
                    height: { xs: 180, sm: 200, md: 240 },
                    objectFit: 'cover',
                    borderRadius: 1,
                    flexShrink: 0,
                    boxShadow: 1,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Grid>
    </Grid>

    </DetailLayout>
  );
};

export default PropertyDetail; 