import { Grid, GridProps } from '@mui/material';

interface GridContainerProps extends GridProps {
  children: React.ReactNode;
}

const GridContainer = ({ children, ...props }: GridContainerProps) => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        width: '100%',
        margin: 0,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default GridContainer; 