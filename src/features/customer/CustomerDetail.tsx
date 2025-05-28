import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Chip } from '@mui/material';
import DetailLayout from '../../components/layout/DetailLayout';
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

  if (!customer) {
    return <Typography>로딩 중...</Typography>;
  }

  const getStatusColor = (status: string) => {
    return status === '활성' ? 'success' : 'default';
  };

  return (
    <DetailLayout
      title={customer.name}
      status={customer.status}
      statusColor={getStatusColor(customer.status)}
      backUrl="/customers"
      onEdit={() => console.log('Edit customer:', id)}
      onDelete={() => console.log('Delete customer:', id)}
    >
      <Grid container spacing={3}>
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
    </DetailLayout>
  );
};

export default CustomerDetail; 