import React from 'react';
import { Box, Paper, Typography, IconButton, Tooltip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface DetailLayoutProps {
  title: string;
  status?: string;
  statusColor?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  backUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

const DetailLayout: React.FC<DetailLayoutProps> = ({
  title,
  status,
  statusColor = 'primary',
  backUrl,
  onEdit,
  onDelete,
  children
}) => {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        width: '100%',
        overflow: 'auto',
        position: 'relative',
        bgcolor: 'background.default'
      }}
    >
      <Box 
        sx={{ 
          p: 3,
          maxWidth: '1200px',
          mx: 'auto',
          width: '100%'
        }}
      >
        <Paper 
          sx={{ 
            p: 3,
            mb: 3,
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            {backUrl && (
              <Tooltip title="뒤로 가기">
                <IconButton 
                  onClick={() => navigate(backUrl)}
                  sx={{ mr: 2 }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            )}
            <Typography variant="h4" sx={{ flex: 1 }}>
              {title}
            </Typography>
            {status && (
              <Typography 
                variant="subtitle1" 
                color={statusColor}
                sx={{ mr: 2 }}
              >
                {status}
              </Typography>
            )}
            {onEdit && (
              <Tooltip title="수정">
                <IconButton onClick={onEdit} sx={{ mr: 1 }}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="삭제">
                <IconButton onClick={onDelete} color="error">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default DetailLayout; 