import { Box, Button, Card, CardContent, Typography, Container, useTheme, useMediaQuery, Paper } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

interface DetailLayoutProps {
  title: string;
  status?: string;
  statusColor?: 'primary' | 'warning' | 'success' | 'error' | 'default';
  backUrl: string;
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

const DetailLayout = ({
  title,
  status,
  statusColor,
  backUrl,
  onEdit,
  onDelete,
  children,
}: DetailLayoutProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3 },
      }}
    >
      {/* Header Section */}
      <Paper 
        elevation={0}
        sx={{ 
          mb: 3,
          p: { xs: 2, sm: 3 },
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
        }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(backUrl)}
            variant="outlined"
            sx={{ 
              width: { xs: '100%', sm: 'auto' },
              minWidth: { sm: '120px' },
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            목록으로
          </Button>
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            width: { xs: '100%', sm: 'auto' }
          }}>
            {onEdit && (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={onEdit}
                sx={{ 
                  width: { xs: '100%', sm: 'auto' },
                  minWidth: { sm: '100px' },
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                수정
              </Button>
            )}
            {onDelete && (
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={onDelete}
                sx={{ 
                  width: { xs: '100%', sm: 'auto' },
                  minWidth: { sm: '100px' },
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                삭제
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Content Section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
            }}
          >
            {title}
          </Typography>
          {status && (
            <Typography
              variant="body1"
              color={statusColor || 'text.primary'}
              sx={{ 
                display: 'inline-block',
                px: 2,
                py: 0.75,
                borderRadius: 2,
                backgroundColor: theme.palette.grey[100],
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              {status}
            </Typography>
          )}
        </Box>
        {children}
      </Paper>
    </Container>
  );
};

export default memo(DetailLayout); 