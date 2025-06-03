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
  Home as HomeIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Description as DescriptionIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { properties } from '../../mocks/properties';
import { format } from 'date-fns';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any | null>(null);

  useEffect(() => {
    const foundProperty = properties.find(p => p.id === Number(id));
    setProperty(foundProperty || null);
  }, [id]);

  if (!property) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>매물을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  const handleEdit = () => {
    navigate(`/properties/${id}/edit`);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Delete property:', id);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          매물 상세 정보
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
                {property.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip
                  label={property.status}
                  color={
                    property.status === '임대중'
                      ? 'success'
                      : property.status === '계약대기'
                      ? 'warning'
                      : 'default'
                  }
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  등록일: {format(new Date(property.registeredAt), 'yyyy년 MM월 dd일')}
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {property.description}
              </Typography>
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
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="매물 유형"
                    secondary={property.type}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="주소"
                    secondary={property.address}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MoneyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="가격"
                    secondary={`${property.price.toLocaleString()}원`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="입주 가능일"
                    secondary={format(new Date(property.availableDate), 'yyyy년 MM월 dd일')}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                담당자 정보
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="담당자"
                    secondary={property.agent}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="연락처"
                    secondary={property.contact}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                특징
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {property.features.map((feature: string, index: number) => (
                  <Chip key={index} label={feature} size="small" />
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                통계
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ViewIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="조회수"
                    secondary={property.viewCount.toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="관심수"
                    secondary={property.interestCount.toLocaleString()}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

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
                    label={property.status}
                    color={
                      property.status === '임대중'
                        ? 'success'
                        : property.status === '계약대기'
                        ? 'warning'
                        : 'default'
                    }
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    등록일
                  </Typography>
                  <Typography variant="body1">
                    {format(new Date(property.registeredAt), 'yyyy년 MM월 dd일')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    입주 가능일
                  </Typography>
                  <Typography variant="body1">
                    {format(new Date(property.availableDate), 'yyyy년 MM월 dd일')}
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

export default PropertyDetail; 