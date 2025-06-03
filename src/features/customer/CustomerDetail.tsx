import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  History as HistoryIcon,
  AttachFile as DocumentIcon,
  Business as BusinessIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { customers } from '../../mocks/customers';
import { format } from 'date-fns';

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<any | null>(null);

  useEffect(() => {
    const foundCustomer = customers.find(c => c.id === Number(id));
    setCustomer(foundCustomer || null);
  }, [id]);

  if (!customer) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>고객을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  const handleEdit = () => {
    navigate(`/customers/${id}/edit`);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Delete customer:', id);
  };

  const getDocumentProgress = (documents: any[]) => {
    if (!documents || documents.length === 0) return 0;
    const completed = documents.filter(doc => doc.status === '완료').length;
    return (completed / documents.length) * 100;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          고객 상세 정보
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            sx={{ mr: 1 }}
          >
            수정
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            삭제
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {customer.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip
                  label={customer.type}
                  color={
                    customer.type === '매수자' ? 'primary' :
                    customer.type === '매도자' ? 'secondary' :
                    customer.type === '임차인' ? 'info' : 'success'
                  }
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={customer.status}
                  color={
                    customer.status === '활성'
                      ? 'success'
                      : customer.status === '비활성'
                      ? 'warning'
                      : 'error'
                  }
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  등록일: {format(new Date(customer.createdAt), 'yyyy년 MM월 dd일')}
                </Typography>
              </Box>
              {customer.notes && (
                <Typography variant="body1" paragraph>
                  {customer.notes}
                </Typography>
              )}
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                기본 정보
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="고객번호"
                    secondary={customer.customerNumber}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="연락처"
                    secondary={customer.phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="이메일"
                    secondary={customer.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="주소"
                    secondary={customer.address}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                계약 현황
              </Typography>
              {customer.contracts.length > 0 ? (
                <List>
                  {customer.contracts.map((contract: any) => (
                    <ListItem key={contract.id}>
                      <ListItemIcon>
                        <BusinessIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={contract.propertyTitle}
                        secondary={
                          <>
                            <Typography variant="body2" component="span">
                              {contract.contractNumber} ({contract.type})
                            </Typography>
                            <br />
                            <Typography variant="body2" component="span">
                              계약일: {format(new Date(contract.contractDate), 'yyyy년 MM월 dd일')}
                            </Typography>
                          </>
                        }
                      />
                      <Chip
                        label={contract.status}
                        size="small"
                        color={
                          contract.status === '완료'
                            ? 'success'
                            : contract.status === '진행중'
                            ? 'warning'
                            : 'error'
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  등록된 계약이 없습니다.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                서류 현황
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  진행률
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={getDocumentProgress(customer.documents)}
                  sx={{ mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {getDocumentProgress(customer.documents)}% 완료
                </Typography>
              </Box>
              <List>
                {customer.documents.map((doc: any, index: number) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <DocumentIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.name}
                      secondary={doc.uploadedAt ? format(new Date(doc.uploadedAt), 'yyyy년 MM월 dd일') : '미제출'}
                    />
                    <Chip
                      label={doc.status}
                      size="small"
                      color={doc.status === '완료' ? 'success' : 'warning'}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {customer.preferences && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  선호 정보
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="선호 매물 유형"
                      secondary={customer.preferences.propertyTypes.join(', ')}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="선호 지역"
                      secondary={customer.preferences.locations.join(', ')}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="가격 범위"
                      secondary={`${customer.preferences.priceRange.min.toLocaleString()}원 ~ ${customer.preferences.priceRange.max.toLocaleString()}원`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                상태 정보
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    현재 상태
                  </Typography>
                  <Chip
                    label={customer.status}
                    color={
                      customer.status === '활성'
                        ? 'success'
                        : customer.status === '비활성'
                        ? 'warning'
                        : 'error'
                    }
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    등록일
                  </Typography>
                  <Typography variant="body1">
                    {format(new Date(customer.createdAt), 'yyyy년 MM월 dd일')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    최종 수정일
                  </Typography>
                  <Typography variant="body1">
                    {format(new Date(customer.lastModified), 'yyyy년 MM월 dd일')}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerDetail; 