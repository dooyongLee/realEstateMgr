import React, { useState } from 'react';
import { Snackbar } from '@mui/material';
import { DetailLayout } from '../../components/DetailLayout';

const ContractDetail = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DetailLayout>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Contract details updated successfully!"
      />
    </DetailLayout>
  );
};

export default ContractDetail; 