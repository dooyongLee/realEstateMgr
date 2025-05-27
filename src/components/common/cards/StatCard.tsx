import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactElement<SvgIconProps>;
  color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${color}.lighter`,
              borderRadius: 1,
              p: 1,
              mr: 2,
            }}
          >
            {React.cloneElement(icon, {
              sx: { color: `${color}.main` },
            })}
          </Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard; 