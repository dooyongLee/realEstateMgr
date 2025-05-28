import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export interface ActionButtonProps extends ButtonProps {
  icon: ReactNode;
  label: string;
}

export const ActionButton = ({ icon, label, ...props }: ActionButtonProps) => {
  return (
    <Button
      variant="contained"
      startIcon={icon}
      {...props}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        px: 2,
        ...props.sx,
      }}
    >
      {label}
    </Button>
  );
};

export default ActionButton; 