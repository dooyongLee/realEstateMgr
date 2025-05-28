import { Grid, GridProps } from '@mui/material';
import { ReactNode } from 'react';

interface GridContainerProps extends GridProps {
  children: ReactNode;
}

const GridContainer = ({ children, ...props }: GridContainerProps) => {
  return (
    <Grid container spacing={3} {...props}>
      {children}
    </Grid>
  );
};

export default GridContainer; 