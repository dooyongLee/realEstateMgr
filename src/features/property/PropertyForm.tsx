import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
  InputAdornment,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import KakaoAddressSearch from '../../components/common/KakaoAddressSearch';
import DatePicker from '../../components/common/DatePicker';
import FileUpload from '../../components/common/FileUpload';

interface FormValues {
  title: string;
  type: string;
  status: string;
  address: string;
  latitude: number;
  longitude: number;
  price: string;
  size: string;
  maintenanceFee: string;
  parking: string;
  moveInDate: string;
  features: string;
  description: string;
  images: File[];
}

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

const validationSchema = Yup.object({
  title: Yup.string().required('매물 제목을 입력해주세요').max(100, '100자 이내로 입력해주세요'),
  type: Yup.string().required('매물 유형을 선택해주세요'),
  status: Yup.string().required('매물 상태를 선택해주세요'),
  address: Yup.string().required('주소를 입력해주세요'),
  latitude: Yup.number().required('위도 정보가 필요합니다'),
  longitude: Yup.number().required('경도 정보가 필요합니다'),
  price: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('금액을 입력해주세요')
    .min(0, '0 이상의 값을 입력해주세요'),
  size: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('면적을 입력해주세요')
    .min(0, '0 이상의 값을 입력해주세요'),
  maintenanceFee: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, '0 이상의 값을 입력해주세요'),
  parking: Yup.string(),
  moveInDate: Yup.date()
    .transform((value) => (value === '' ? undefined : value))
    .required('입주 가능일을 선택해주세요'),
  features: Yup.string().max(200, '200자 이내로 입력해주세요'),
  description: Yup.string().max(1000, '1000자 이내로 입력해주세요'),
  images: Yup.array().of(Yup.mixed()).max(10, '최대 10개의 이미지만 업로드할 수 있습니다'),
});

const PropertyForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      type: '',
      status: 'AVAILABLE',
      address: '',
      latitude: 0,
      longitude: 0,
      price: '',
      size: '',
      maintenanceFee: '',
      parking: '',
      moveInDate: '',
      features: '',
      description: '',
      images: [],
    },
    validationSchema,
    onSubmit: async (values: FormValues) => {
      try {
        setIsSubmitting(true);
        setError(null);
        // API 호출 로직 추가
        console.log('Form submitted:', values);
        navigate('/properties');
      } catch (err) {
        setError('매물 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleAddressSelect = useCallback((address: string, latitude: number, longitude: number) => {
    formik.setFieldValue('address', address);
    formik.setFieldValue('latitude', latitude);
    formik.setFieldValue('longitude', longitude);
  }, [formik]);

  const handleNext = useCallback(() => {
    const currentStepFields = getStepFields(activeStep);
    console.log('Current step fields:', currentStepFields);
    console.log('Current form values:', formik.values);

    // 현재 단계의 필드들만 검증
    const currentStepValues = currentStepFields.reduce<Partial<FormValues>>((acc, field) => {
      acc[field] = formik.values[field];
      return acc;
    }, {});

    const currentStepSchema = Yup.object().shape(
      currentStepFields.reduce<Record<string, Yup.Schema<any>>>((acc, field) => {
        const fieldSchema = (validationSchema as any).fields[field];
        if (fieldSchema) {
          acc[field] = fieldSchema;
        }
        return acc;
      }, {})
    );

    console.log('Validating with schema:', currentStepSchema);

    currentStepSchema
      .validate(currentStepValues, { abortEarly: false })
      .then(() => {
        console.log('Validation successful, moving to next step');
        setActiveStep((prev) => prev + 1);
      })
      .catch((err: Yup.ValidationError) => {
        console.log('Validation errors:', err.inner);
        const errors = err.inner.reduce<Record<string, string>>((acc, error) => {
          if (error.path) {
            acc[error.path] = error.message;
          }
          return acc;
        }, {});
        console.log('Setting form errors:', errors);
        formik.setErrors(errors);
      });
  }, [activeStep, formik]);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => prev - 1);
  }, []);

  const getStepFields = (step: number): (keyof FormValues)[] => {
    switch (step) {
      case 0:
        return ['title', 'type', 'status', 'address'];
      case 1:
        return ['price', 'size', 'maintenanceFee', 'parking', 'moveInDate'];
      case 2:
        return ['features', 'description', 'images'];
      default:
        return [];
    }
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
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="매물 유형"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
                required
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
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
                required
              >
                {propertyStatuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                주소
              </Typography>
              <KakaoAddressSearch
                value={formik.values.address}
                onAddressSelect={handleAddressSelect}
                error={Boolean(formik.touched.address && formik.errors.address)}
                helperText={formik.touched.address ? formik.errors.address : undefined}
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
                value={formik.values.price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*$/.test(value)) {
                    formik.setFieldValue('price', value);
                  }
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                required
                type="text"
                InputProps={{
                  endAdornment: <InputAdornment position="end">만원</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="면적"
                name="size"
                value={formik.values.size}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*$/.test(value)) {
                    formik.setFieldValue('size', value);
                  }
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.size && Boolean(formik.errors.size)}
                helperText={formik.touched.size && formik.errors.size}
                required
                type="text"
                InputProps={{
                  endAdornment: <InputAdornment position="end">㎡</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="관리비"
                name="maintenanceFee"
                value={formik.values.maintenanceFee}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*$/.test(value)) {
                    formik.setFieldValue('maintenanceFee', value);
                  }
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.maintenanceFee && Boolean(formik.errors.maintenanceFee)}
                helperText={formik.touched.maintenanceFee && formik.errors.maintenanceFee}
                type="text"
                InputProps={{
                  endAdornment: <InputAdornment position="end">만원</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="주차"
                name="parking"
                value={formik.values.parking}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.parking && Boolean(formik.errors.parking)}
                helperText={formik.touched.parking && formik.errors.parking}
                placeholder="예: 1대 가능"
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="입주 가능일"
                value={formik.values.moveInDate}
                onChange={(date) => formik.setFieldValue('moveInDate', date)}
                error={formik.touched.moveInDate && Boolean(formik.errors.moveInDate)}
                helperText={formik.touched.moveInDate && formik.errors.moveInDate}
                required
                minDate={new Date()} // 오늘 이전 날짜는 선택 불가
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
                value={formik.values.features}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.features && Boolean(formik.errors.features)}
                helperText={formik.touched.features && formik.errors.features}
                placeholder="예: 역세권, 학교근처, 조용한 동네"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="상세 설명"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                multiline
                rows={4}
                placeholder="매물에 대한 자세한 설명을 입력하세요"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                매물 사진
              </Typography>
              <FileUpload
                files={formik.values.images}
                onChange={(files) => formik.setFieldValue('images', files)}
                error={formik.touched.images && Boolean(formik.errors.images)}
                helperText={formik.touched.images && formik.errors.images}
                maxFiles={10}
                accept="image/*"
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
            매물 등록
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 4 }}>
            {renderStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              이전
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  등록하기
                </LoadingButton>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  다음
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PropertyForm; 