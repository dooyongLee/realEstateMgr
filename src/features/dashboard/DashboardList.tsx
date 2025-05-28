import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  AttachMoney as MoneyIcon,
  Notifications as NotificationIcon,
} from '@mui/icons-material';

// 임시 목업 데이터
const recentActivities = [
  {
    id: 1,
    type: '계약',
    title: '새로운 계약이 등록되었습니다',
    description: '홍길동님과의 임대차 계약이 등록되었습니다.',
    date: '2024-03-15 14:30',
    status: '완료',
  },
  {
    id: 2,
    type: '매물',
    title: '매물 상태가 변경되었습니다',
    description: '강남 아파트의 상태가 "임대 중"으로 변경되었습니다.',
    date: '2024-03-15 13:45',
    status: '진행중',
  },
  {
    id: 3,
    type: '고객',
    title: '새로운 고객이 등록되었습니다',
    description: '김철수님이 고객으로 등록되었습니다.',
    date: '2024-03-15 12:20',
    status: '완료',
  },
];

const DashboardList = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* 통계 카드 */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HomeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">전체 매물</Typography>
              </Box>
              <Typography variant="h4" gutterBottom>
                150
              </Typography>
              <Typography variant="body2" color="text.secondary">
                전월 대비 5% 증가
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">전체 고객</Typography>
              </Box>
              <Typography variant="h4" gutterBottom>
                80
              </Typography>
              <Typography variant="body2" color="text.secondary">
                전월 대비 3% 증가
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssignmentIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">진행중 계약</Typography>
              </Box>
              <Typography variant="h4" gutterBottom>
                40
              </Typography>
              <Typography variant="body2" color="text.secondary">
                전월 대비 2건 증가
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MoneyIcon color="error" sx={{ mr: 1 }} />
                <Typography variant="h6">월 매출</Typography>
              </Box>
              <Typography variant="h4" gutterBottom>
                3,500만원
              </Typography>
              <Typography variant="body2" color="text.secondary">
                전월 대비 10% 증가
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 최근 활동 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                최근 활동
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <Box key={activity.id}>
                    <ListItem>
                      <ListItemIcon>
                        <NotificationIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1">{activity.title}</Typography>
                            <Chip
                              label={activity.status}
                              size="small"
                              color={activity.status === '완료' ? 'success' : 'warning'}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {activity.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {activity.date}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardList;
