import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import ImageModal from '../modal/ImageModal';

interface PropertyImageGalleryProps {
  images: string[];
}

const PropertyImageGallery = ({ images }: PropertyImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        매물 사진
      </Typography>
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 2,
          '& img': {
            width: '100%',
            height: { xs: 200, sm: 220, md: 240 },
            objectFit: 'cover',
            borderRadius: 1,
            boxShadow: 1,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
              cursor: 'pointer',
            },
          },
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`Property ${index + 1}`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </Box>

      <ImageModal
        open={!!selectedImage}
        imageUrl={selectedImage || ''}
        onClose={handleCloseModal}
      />
    </Box>
  );
};

export default PropertyImageGallery; 