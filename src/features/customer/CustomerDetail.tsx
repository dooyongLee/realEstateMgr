import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Customer } from './types';

// 임시 목업 데이터
const mockCustomer: Customer = {
  id: '1',
  name: '홍길동',
  phone: '010-1234-5678',
  email: 'hong@example.com',
  type: '매수희망',
  status: '활성',
  address: '서울시 강남구',
  note: '3룸 이상 희망',
  createdAt: '2024-03-15',
  updatedAt: '2024-03-15',
};

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // TODO: API 연동
    setCustomer(mockCustomer);
  }, [id]);

  const handleBack = () => {
    navigate('/customers');
  };

  const handleEdit = () => {
    // TODO: 수정 페이지로 이동
    console.log('Edit customer:', id);
  };

  const handleDelete = () => {
    // TODO: 삭제 확인 다이얼로그 표시
    console.log('Delete customer:', id);
  };

  if (!customer) {
    return <Typography>로딩 중...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between',alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          목록으로
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => console.log('Edit customer:')}
        >
          수정
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          variant="contained"
          color="error"
        >
          삭제
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          고객 정보
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              이름
            </Typography>
            <Typography variant="body1">{customer.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              연락처
            </Typography>
            <Typography variant="body1">{customer.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              이메일
            </Typography>
            <Typography variant="body1">{customer.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              유형
            </Typography>
            <Chip
              label={customer.type}
              color={
                customer.type === '매수희망'
                  ? 'primary'
                  : customer.type === '매도희망'
                  ? 'success'
                  : customer.type === '임대희망'
                  ? 'warning'
                  : 'info'
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              상태
            </Typography>
            <Chip
              label={customer.status}
              color={customer.status === '활성' ? 'success' : 'default'}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              주소
            </Typography>
            <Typography variant="body1">{customer.address}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              비고
            </Typography>
            <Typography variant="body1">{customer.note}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              등록일
            </Typography>
            <Typography variant="body1">{customer.createdAt}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              수정일
            </Typography>
            <Typography variant="body1">{customer.updatedAt}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CustomerDetail; 