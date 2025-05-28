import React from 'react';
import { Container, Typography, Box } from '@mui/material';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </Container>
  );
};

export default PageLayout; 