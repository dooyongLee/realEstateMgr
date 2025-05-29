import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Chip, Paper, CircularProgress, Alert } from '@mui/material';
import DetailLayout from '../../components/layout/DetailLayout';
import PropertyImageGallery from '../../components/layout/PropertyImageGallery';
import KakaoMap from '../../components/common/KakaoMap';
import { useState, useEffect } from 'react';
import { fetchRecentTransactionPrices, parsePrice, parseArea } from '../../utils/realEstatePrice';
import { formatArea } from '../../utils/areaConverter';

interface Property {
  id: number;
  title: string;
  type: string;
  price: string;
  size: string;
  status: string;
  location: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  description: string;
  features: string[];
  images: string[];
  regionCode?: string;
  name?: string;
}

// Mock data for development
const mockProperties: Property[] = [
  {
    id: 1,
    title: '강남 아파트',
    type: 'APARTMENT',
    price: '12억',
    size: '120',
    status: '판매중',
    location: '서울시 강남구',
    latitude: 37.517235,
    longitude: 127.047325,
    createdAt: '2024-03-15',
    description: '강남역 도보 5분 거리에 위치한 프리미엄 아파트입니다. 넓은 평수와 좋은 조망을 자랑합니다.',
    features: ['주차 2대', '엘리베이터', 'CCTV', '24시간 경비'],
    images: ['https://picsum.photos/800/400?random=1', 'https://picsum.photos/800/400?random=3', 'https://picsum.photos/800/400?random=4', 'https://picsum.photos/800/400?random=5', 'https://picsum.photos/800/400?random=6'],
    regionCode: '11680', // 강남구 지역코드
    name: '래미안아파트',
  },
  {
    id: 2,
    title: '송파 오피스텔',
    type: 'OFFICETEL',
    price: '8억',
    size: '80',
    status: '계약중',
    location: '서울시 송파구',
    latitude: 37.5139,
    longitude: 127.1006,
    createdAt: '2024-03-14',
    description: '잠실역 인근의 고급 오피스텔입니다. 최신 인테리어와 편리한 교통을 제공합니다.',
    features: ['주차 1대', '엘리베이터', 'CCTV', '24시간 경비'],
    images: ['https://picsum.photos/800/400?random=2'],
  },
];

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactionPrices, setTransactionPrices] = useState<any[]>([]);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);

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

  // 실거래가 데이터 조회
  useEffect(() => {
    const fetchTransactionPrices = async () => {
      if (!property || property.type !== 'APARTMENT') return;

      try {
        setPriceLoading(true);
        setPriceError(null);

        // 현재 날짜 기준으로 최근 3개월 데이터 조회
        const today = new Date();
        const months = Array.from({ length: 3 }, (_, i) => {
          const date = new Date(today);
          date.setMonth(date.getMonth() - i);
          return date.toISOString().slice(0, 7).replace('-', '');
        });

        const allPrices = [];
        for (const month of months) {
          const prices = await fetchRecentTransactionPrices(
            property.regionCode || '', // 지역코드
            month,
            property.name || '' // 아파트명
          );
          allPrices.push(...prices);
        }

        // 면적이 비슷한 매물만 필터링 (현재 매물 면적의 ±10% 이내)
        const currentArea = parseFloat(property.size);
        const filteredPrices = allPrices.filter(price => {
          const priceArea = parseArea(price.전용면적);
          return Math.abs(priceArea - currentArea) / currentArea <= 0.1;
        });

        setTransactionPrices(filteredPrices);
      } catch (err) {
        setPriceError('실거래가 정보를 불러오는데 실패했습니다.');
        console.error('실거래가 조회 중 오류:', err);
      } finally {
        setPriceLoading(false);
      }
    };

    fetchTransactionPrices();
  }, [property]);

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
              {property.features.map((feature: string, index: number) => (
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
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              위치
            </Typography>
            <KakaoMap
              latitude={property.latitude}
              longitude={property.longitude}
              height="400px"
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <PropertyImageGallery images={property.images} />
        </Grid>
      </Grid>
    </DetailLayout>
  );
};

export default PropertyDetail; 