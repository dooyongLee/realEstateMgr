import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ImageModalProps {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ImageModal = ({ open, imageUrl, onClose }: ImageModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#999999, 0.9',
      }}
    >
      <Box sx={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: -40,
            top: -40,
            color: 'white',
            '&:hover': {
              color: 'grey.300',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="img"
          src={imageUrl}
          alt="Enlarged property"
          sx={{
            maxWidth: '100%',
            maxHeight: '90vh',
            objectFit: 'contain',
            borderRadius: 1,
          }}
        />
      </Box>
    </Modal>
  );
};

export default ImageModal; 