import { Box, Button, Card, CardContent, Grid, Typography, Container } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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

  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      <Box sx={{ 
        p: { xs: 2, sm: 3 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ 
          mb: 3, 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
          flexShrink: 0
        }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(backUrl)}
            fullWidth={false}
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
                fullWidth={false}
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
                fullWidth={false}
              >
                삭제
              </Button>
            )}
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ flex: 1, minHeight: 0 }}>
          <Grid item xs={12}>
            <Card sx={{ 
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CardContent sx={{ 
                flex: 1,
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '4px',
                  '&:hover': {
                    background: '#555',
                  },
                },
                scrollbarWidth: 'thin',
                scrollbarColor: '#888 #f1f1f1',
              }}>
                <Typography variant="h4" gutterBottom>
                  {title}
                </Typography>
                {status && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body1"
                      color={statusColor || 'text.primary'}
                      sx={{ fontWeight: 'bold' }}
                    >
                      {status}
                    </Typography>
                  </Box>
                )}
                {children}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DetailLayout; 