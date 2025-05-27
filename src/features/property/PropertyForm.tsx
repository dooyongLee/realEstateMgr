import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddressInput from '@/components/common/AddressInput';

const propertyTypes = [
  { value: '아파트', label: '아파트' },
  { value: '오피스텔', label: '오피스텔' },
  { value: '주택', label: '주택' },
  { value: '상가', label: '상가' },
  { value: '사무실', label: '사무실' },
];

const PropertyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    price: '',
    size: '',
    address: '',
    detailAddress: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (address: string, detailAddress: string) => {
    setFormData((prev) => ({
      ...prev,
      address,
      detailAddress,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Implement form submission
    navigate('/properties');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          매물 등록
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} component="div">
              <TextField
                fullWidth
                label="제목"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                fullWidth
                select
                label="유형"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                {propertyTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                fullWidth
                label="가격"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                fullWidth
                label="면적"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} component="div">
              <AddressInput
                value={formData.address}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={12} component="div">
              <TextField
                fullWidth
                multiline
                rows={4}
                label="설명"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} component="div">
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/properties')}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                >
                  등록
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyForm; 