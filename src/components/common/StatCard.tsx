import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon, color, trend }: StatCardProps) => {
  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        minHeight: 180,
        transition: 'all 0.3s ease-in-out',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[4],
          borderColor: `${color}40`,
          '& .MuiBox-root:last-child': {
            backgroundColor: `${color}20`,
          }
        }
      }}
    >
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            sx={{ 
              fontWeight: 500,
              fontSize: '0.875rem',
              letterSpacing: '0.5px'
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              transition: 'all 0.3s ease-in-out',
            }}
          >
            {icon}
          </Box>
        </Box>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              mb: trend ? 1.5 : 0,
              color: 'text.primary',
              fontSize: '2rem'
            }}
          >
            {value}
          </Typography>
          
          {trend && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5,
                backgroundColor: trend.isPositive ? 'success.lighter' : 'error.lighter',
                borderRadius: 1,
                px: 1,
                py: 0.5,
                width: 'fit-content'
              }}
            >
              {trend.isPositive ? (
                <TrendingUpIcon sx={{ color: 'success.main', fontSize: 18 }} />
              ) : (
                <TrendingDownIcon sx={{ color: 'error.main', fontSize: 18 }} />
              )}
              <Typography
                variant="body2"
                color={trend.isPositive ? 'success.main' : 'error.main'}
                sx={{ 
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                {trend.isPositive ? '+' : '-'}{trend.value}%
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard; 