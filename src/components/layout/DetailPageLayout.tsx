import { FC, ReactNode } from 'react';
import { Box, Paper, Typography, IconButton, Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface DetailPageLayoutProps {
  title: string;
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
  actions?: ReactNode;
  children: ReactNode;
  onBack?: () => void;
}

const DetailPageLayout: FC<DetailPageLayoutProps> = ({
  title,
  breadcrumbs,
  actions,
  children,
  onBack,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 헤더 영역 */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleBack} aria-label="뒤로 가기">
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h5" component="h1" gutterBottom>
              {title}
            </Typography>
            {breadcrumbs && (
              <Breadcrumbs aria-label="breadcrumb">
                {breadcrumbs.map((crumb, index) => (
                  <Link
                    key={index}
                    color={index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
                    href={crumb.href}
                    underline="hover"
                  >
                    {crumb.label}
                  </Link>
                ))}
              </Breadcrumbs>
            )}
          </Box>
        </Box>
        {actions && <Box>{actions}</Box>}
      </Box>

      {/* 컨텐츠 영역 */}
      <Paper sx={{ p: 3 }}>
        {children}
      </Paper>
    </Box>
  );
};

export default DetailPageLayout; 