import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface FormDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  submitText?: string;
  cancelText?: string;
  submitDisabled?: boolean;
  loading?: boolean;
  showCloseButton?: boolean;
  actions?: React.ReactNode;
}

const FormDialog: React.FC<FormDialogProps> = ({
  open,
  title,
  onClose,
  onSubmit,
  children,
  maxWidth = 'sm',
  fullWidth = true,
  submitText = '확인',
  cancelText = '취소',
  submitDisabled = false,
  loading = false,
  showCloseButton = true,
  actions,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          minHeight: 200,
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">{title}</Typography>
          {showCloseButton && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </DialogContent>
      <DialogActions>
        {actions || (
          <>
            <Button onClick={onClose} disabled={loading}>
              {cancelText}
            </Button>
            <Button
              onClick={onSubmit}
              variant="contained"
              color="primary"
              disabled={submitDisabled || loading}
            >
              {submitText}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog; 