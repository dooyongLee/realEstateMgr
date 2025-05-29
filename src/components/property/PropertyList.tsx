import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Property } from '@/types/property';
import SearchPanel from './SearchPanel';

interface PropertyListProps {
  properties: Property[];
  onDelete: (id: string) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onDelete }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    type: '',
    contractType: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
  });

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, property: Property) => {
    setAnchorEl(event.currentTarget);
    setSelectedProperty(property);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProperty(null);
  };

  const handleEdit = () => {
    if (selectedProperty) {
      navigate(`/properties/${selectedProperty.id}/edit`);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (selectedProperty) {
      onDelete(selectedProperty.id);
    }
    setDeleteDialogOpen(false);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    // TODO: Implement search logic
    console.log('Search with filters:', filters);
  };

  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case 'sale':
        return '매매';
      case 'monthlyRent':
        return '월세';
      case 'yearRent':
        return '전세';
      default:
        return type;
    }
  };

  const getContractTypeColor = (type: string): 'primary' | 'secondary' | 'info' | 'error' | 'success' | 'warning' => {
    switch (type) {
      case 'sale':
        return 'primary';
      case 'monthlyRent':
        return 'secondary';
      case 'yearRent':
        return 'info';
      default:
        return 'primary';
    }
  };

  const convertToPyeong = (squareMeters: number) => {
    return (squareMeters * 0.3025).toFixed(1);
  };

  return (
    <Box>
      <SearchPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
              onClick={() => navigate(`/properties/${property.id}`)}
            >
              <Box
                component="img"
                src={property.images?.[0] || '/placeholder.jpg'}
                alt={property.name}
                sx={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 2
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {property.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, property);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {property.address}
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr',
                  gap: 1,
                  mb: 2
                }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                      계약 형태
                    </Typography>
                    <Chip
                      key={`contract-${property.id}`}
                      label={getContractTypeLabel(property.contractType)}
                      color={getContractTypeColor(property.contractType)}
                      size="small"
                      sx={{ 
                        fontWeight: 'bold',
                        width: '100%',
                        justifyContent: 'center',
                        height: '32px'
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                      면적
                    </Typography>
                    <Chip
                      key={`size-${property.id}`}
                      label={`${property.area}㎡ (${convertToPyeong(property.area)}평)`}
                      variant="outlined"
                      size="small"
                      sx={{ 
                        width: '100%',
                        justifyContent: 'center',
                        height: '32px'
                      }}
                    />
                  </Box>
                </Box>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  {property.price.toLocaleString()}원
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>수정</MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          삭제
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>매물 삭제</DialogTitle>
        <DialogContent>
          <Typography>
            정말로 이 매물을 삭제하시겠습니까?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PropertyList; 