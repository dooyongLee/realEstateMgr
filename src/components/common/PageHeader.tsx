import React from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
  actions,
  subtitle,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 1 }}
        >
          {breadcrumbs.map((item, index) => (
            item.href ? (
              <Link
                key={index}
                color="inherit"
                href={item.href}
                underline="hover"
              >
                {item.label}
              </Link>
            ) : (
              <Typography key={index} color="text.primary">
                {item.label}
              </Typography>
            )
          ))}
        </Breadcrumbs>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        {actions && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PageHeader; 