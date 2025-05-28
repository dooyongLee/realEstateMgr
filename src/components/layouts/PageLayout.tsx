import { Box, Paper, Typography, SxProps, Theme, useTheme, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';

export interface PageLayoutProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children?: ReactNode;
  sx?: SxProps<Theme>;
  maxWidth?: string | number;
  elevation?: number;
  spacing?: number;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
}

const PageLayout = ({
  title,
  subtitle,
  actions,
  children,
  sx,
  maxWidth = 'lg',
  elevation = 1,
  spacing = 3,
  isLoading,
  error,
  onRetry,
}: PageLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing,
        maxWidth,
        mx: 'auto',
        width: '100%',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3 },
        minHeight: '100%',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          mb: 1,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600,
              color: 'text.primary',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                maxWidth: '800px',
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {actions && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            {actions}
          </Box>
        )}
      </Box>

      <Paper
        elevation={elevation}
        sx={{
          p: { xs: 2, sm: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: { xs: 'auto', sm: '400px' },
          transition: theme.transitions.create(['box-shadow', 'transform'], {
            duration: theme.transitions.duration.shorter,
          }),
          '&:hover': {
            boxShadow: theme.shadows[4],
            transform: 'translateY(-2px)',
          },
        }}
      >
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1,
            }}
          >
            <Typography>Loading...</Typography>
          </Box>
        )}

        {error && (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              color: 'error.main',
            }}
          >
            <Typography variant="h6" gutterBottom>
              {error}
            </Typography>
            {onRetry && (
              <Typography
                component="button"
                onClick={onRetry}
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}
              >
                Try again
              </Typography>
            )}
          </Box>
        )}

        {!isLoading && !error && children}
      </Paper>
    </Box>
  );
};

export default PageLayout; 