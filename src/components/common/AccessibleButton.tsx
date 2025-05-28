import { Button, ButtonProps } from '@mui/material';
import { forwardRef } from 'react';

interface AccessibleButtonProps extends ButtonProps {
  ariaLabel?: string;
  ariaDescribedby?: string;
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ ariaLabel, ariaDescribedby, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton; 