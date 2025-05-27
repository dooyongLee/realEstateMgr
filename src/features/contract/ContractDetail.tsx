import { Box, Card, Typography, Grid, Chip, Button, Divider } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

// Mock data for development
const mockContracts = [
  {
    id: 1,
    propertyTitle: '강남 아파트',
    propertyType: '아파트',
    propertySize: '84.5㎡',
    propertyLocation: '서울시 강남구',
    tenantName: '홍길동',
    tenantPhone: '010-1234-5678',
    tenantEmail: 'hong@example.com',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    deposit: '5000만원',
    monthlyRent: '200만원',
    status: '진행중',
    createdAt: '2024-02-15',
    description: '강남역 도보 5분 거리에 위치한 3룸 아파트입니다.',
    terms: [
      '계약기간: 1년',
      '월세 지불일: 매월 1일',
      '관리비: 월 15만원',
      '주차: 1대 가능',
      '반려동물: 불가능',
    ],
  },
  {
    id: 2,
    propertyTitle: '송파 오피스텔',
    propertyType: '오피스텔',
    propertySize: '59.8㎡',
    propertyLocation: '서울시 송파구',
    tenantName: '김철수',
    tenantPhone: '010-9876-5432',
    tenantEmail: 'kim@example.com',
    startDate: '2024-04-01',
    endDate: '2025-03-31',
    deposit: '3000만원',
    monthlyRent: '150만원',
    status: '대기중',
    createdAt: '2024-03-14',
    description: '잠실역 도보 3분 거리에 위치한 2룸 오피스텔입니다.',
    terms: [
      '계약기간: 1년',
      '월세 지불일: 매월 1일',
      '관리비: 월 10만원',
      '주차: 불가능',
      '반려동물: 가능',
    ],
  },
];

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contract = mockContracts.find(c => c.id === Number(id));

  if (!contract) {
    return <Typography>계약을 찾을 수 없습니다.</Typography>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '진행중':
        return 'primary';
      case '대기중':
        return 'warning';
      case '완료':
        return 'success';
      case '취소':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/contracts')}
        >
          목록으로
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => console.log('Edit contract:', contract.id)}
        >
          수정
        </Button>
      </Box>

      <Card sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            {contract.propertyTitle}
          </Typography>
          <Chip
            label={contract.status}
            color={getStatusColor(contract.status)}
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            등록일: {contract.createdAt}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              매물 정보
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                유형
              </Typography>
              <Typography variant="body1">{contract.propertyType}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                크기
              </Typography>
              <Typography variant="body1">{contract.propertySize}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                위치
              </Typography>
              <Typography variant="body1">{contract.propertyLocation}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                설명
              </Typography>
              <Typography variant="body1">{contract.description}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              임차인 정보
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                이름
              </Typography>
              <Typography variant="body1">{contract.tenantName}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                연락처
              </Typography>
              <Typography variant="body1">{contract.tenantPhone}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                이메일
              </Typography>
              <Typography variant="body1">{contract.tenantEmail}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              계약 정보
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  시작일
                </Typography>
                <Typography variant="body1">{contract.startDate}</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  종료일
                </Typography>
                <Typography variant="body1">{contract.endDate}</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  보증금
                </Typography>
                <Typography variant="body1">{contract.deposit}</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  월세
                </Typography>
                <Typography variant="body1">{contract.monthlyRent}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              계약 조건
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {contract.terms.map((term, index) => (
                <Chip key={index} label={term} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ContractDetail; 