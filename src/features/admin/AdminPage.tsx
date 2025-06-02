import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Home as HomeIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import StatsCard from '@/components/common/StatsCard';

// 임시 목업 데이터
const mockStats = {
  totalProperties: {
    value: 156,
    change: 12,
    isPositive: true,
  },
  totalRealtors: {
    value: 45,
    change: 5,
    isPositive: true,
  },
  successfulContracts: {
    value: 89,
    change: -3,
    isPositive: false,
  },
  propertyTypes: [
    { name: '아파트', value: 65 },
    { name: '주택', value: 35 },
    { name: '상가', value: 25 },
    { name: '사무실', value: 31 },
  ],
  monthlyStats: [
    { month: '1월', count: 12 },
    { month: '2월', count: 19 },
    { month: '3월', count: 15 },
    { month: '4월', count: 22 },
    { month: '5월', count: 28 },
    { month: '6월', count: 35 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminPage = () => {
  const theme = useTheme();

  return (
    <Box>


      {/* 통계 카드 섹션 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="전체 매물 수"
            value={mockStats.totalProperties.value}
            icon={<HomeIcon />}
            color={theme.palette.primary.main}
            trend={{
              value: mockStats.totalProperties.change,
              isPositive: mockStats.totalProperties.isPositive,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="공인중개사 수"
            value={mockStats.totalRealtors.value}
            icon={<BusinessIcon />}
            color={theme.palette.success.main}
            trend={{
              value: mockStats.totalRealtors.change,
              isPositive: mockStats.totalRealtors.isPositive,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="계약 성공 수"
            value={mockStats.successfulContracts.value}
            icon={<AssignmentIcon />}
            color={theme.palette.info.main}
            trend={{
              value: mockStats.successfulContracts.change,
              isPositive: mockStats.successfulContracts.isPositive,
            }}
          />
        </Grid>
      </Grid>

      {/* 차트 섹션 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3, 
              height: 400,
              display: 'flex',
              flexDirection: 'column',
              '& .recharts-wrapper': {
                margin: '0 auto'
              }
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              매물 유형별 분포
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockStats.propertyTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockStats.propertyTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: number) => [`${value}건`, '매물 수']}
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.shape.borderRadius,
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  wrapperStyle={{
                    paddingTop: '20px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3, 
              height: 400,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              월별 매물 등록 현황
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockStats.monthlyStats}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip 
                  formatter={(value: number) => [`${value}건`, '매물 수']}
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.shape.borderRadius,
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill={theme.palette.primary.main}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPage;
