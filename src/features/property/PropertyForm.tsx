import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
  InputAdornment,
} from '@mui/material';
import AddressSearch from '@/components/common/AddressSearch';

const propertyTypes = [
  { value: 'APARTMENT', label: '아파트' },
  { value: 'HOUSE', label: '주택' },
  { value: 'COMMERCIAL', label: '상가' },
  { value: 'OFFICE', label: '사무실' },
];

const propertyStatuses = [
  { value: 'AVAILABLE', label: '임대 가능' },
  { value: 'RENTED', label: '임대 중' },
  { value: 'MAINTENANCE', label: '보수 중' },
];

const steps = ['기본 정보', '상세 정보', '추가 정보'];

const PropertyForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    status: 'AVAILABLE',
    address: '',
    price: '',
    size: '',
    maintenanceFee: '',
    parking: '',
    moveInDate: '',
    features: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (address: string) => {
    setFormData((prev) => ({
      ...prev,
      address,
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/properties');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="매물 제목"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                helperText="매물을 구분할 수 있는 제목을 입력하세요"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="매물 유형"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                helperText="매물의 유형을 선택하세요"
              >
                {propertyTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="매물 상태"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                helperText="현재 매물의 상태를 선택하세요"
              >
                {propertyStatuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                주소
              </Typography>
              <AddressSearch
                value={formData.address}
                onChange={handleAddressChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="월세/전세 금액"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">만원</InputAdornment>,
                }}
                helperText="월세 또는 전세 금액을 입력하세요"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="면적"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">㎡</InputAdornment>,
                }}
                helperText="전용면적을 입력하세요"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="관리비"
                name="maintenanceFee"
                value={formData.maintenanceFee}
                onChange={handleChange}
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">만원</InputAdornment>,
                }}
                helperText="월 관리비를 입력하세요"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="주차"
                name="parking"
                value={formData.parking}
                onChange={handleChange}
                placeholder="예: 1대 가능"
                helperText="주차 가능 대수를 입력하세요"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="입주 가능일"
                name="moveInDate"
                type="date"
                value={formData.moveInDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText="가능한 입주 날짜를 선택하세요"
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="특징"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="예: 역세권, 학교근처, 조용한 동네"
                multiline
                rows={2}
                helperText="매물의 주요 특징을 쉼표로 구분하여 입력하세요"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="상세 설명"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="매물에 대한 자세한 설명을 입력하세요"
                helperText="매물의 상세한 정보를 입력하세요"
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          매물 등록
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 1 }}>
          {activeStep > 0 && (
            <Button onClick={handleBack} variant="outlined" size="large">
              이전
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext} variant="contained" size="large">
              다음
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary" size="large">
              등록
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default PropertyForm; 