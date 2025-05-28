import { ReactNode } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const PageLayout = ({ title, children, actions, maxWidth = 'lg' }: PageLayoutProps) => {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        {actions && <Box>{actions}</Box>}
      </Box>
      <Paper sx={{ p: 3 }}>{children}</Paper>
    </Container>
  );
};

export default PageLayout; 