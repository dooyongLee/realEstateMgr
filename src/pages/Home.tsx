import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  Apartment as ApartmentIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const Home = () => {
  const stats = [
    {
      title: '총 매물 수',
      value: '150',
      icon: <ApartmentIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: '계약 건수',
      value: '45',
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: '사용자 수',
      value: '1,200',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        대시보드
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={4} key={stat.title}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: stat.color,
                color: 'white',
              }}
            >
              {stat.icon}
              <Typography variant="h4" sx={{ mt: 2 }}>
                {stat.value}
              </Typography>
              <Typography variant="subtitle1">{stat.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home; 