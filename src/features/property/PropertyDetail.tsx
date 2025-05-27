import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Grid, Chip, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@mui/icons-material';

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
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/properties')}
        >
          목록으로
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => console.log('Edit property:', property.id)}
        >
          수정
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {property.title}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={property.status}
                  color={getStatusColor(property.status)}
                  sx={{ mr: 1 }}
                />
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
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                매물 사진
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
                {property.images.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={image}
                    alt={`Property ${index + 1}`}
                    sx={{
                      width: 300,
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyDetail; 