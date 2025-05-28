import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React from 'react';

interface CommonSectionLayoutProps {
  title: string;
}

const CommonSectionLayout: React.FC<CommonSectionLayoutProps> = ({ title }) => (
  <Box>
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
    <Outlet />
  </Box>
);

export default CommonSectionLayout; 