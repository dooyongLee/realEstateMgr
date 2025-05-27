import { Box, Container, Typography, Link, useTheme, useMediaQuery } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 2 },
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant={isMobile ? "caption" : "body2"} 
          color="text.secondary" 
          align="center"
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        >
          {'© '}
          <Link color="inherit" href="/">
            부동산 관리 시스템
          </Link>{' '}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;