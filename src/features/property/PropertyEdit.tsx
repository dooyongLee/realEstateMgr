import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, MenuItem, InputAdornment, Box, Button, Typography } from '@mui/material';
import EditFormLayout from '@/components/layout/EditFormLayout';
import KakaoAddressSearch from '@/components/common/KakaoAddressSearch';
import DatePicker from '@/components/common/DatePicker';
import FileUpload from '@/components/common/FileUpload';
import { useProperty } from '@/hooks/useProperty';
import { Property } from '@/types/property';

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
  features: string[];
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
  { value: 'SALE', label: '매매' },
  { value: 'AVAILABLE', label: '임대 가능' },
  { value: 'RENTED', label: '임대 중' },
];

const propertyFeatures = [
  { value: 'NEAR_STATION', label: '역세권' },
  { value: 'NEAR_SCHOOL', label: '학교근처' },
  { value: 'QUIET_AREA', label: '조용한 동네' },
  { value: 'PARKING', label: '주차 편리' },
  { value: 'ELEVATOR', label: '엘리베이터' },
  { value: 'SECURITY', label: '보안시설' },
  { value: 'PET_FRIENDLY', label: '반려동물 가능' },
  { value: 'BALCONY', label: '베란다' },
  { value: 'AIR_CONDITIONER', label: '에어컨' },
  { value: 'WASHING_MACHINE', label: '세탁기' },
  { value: 'REFRIGERATOR', label: '냉장고' },
  { value: 'GAS_RANGE', label: '가스레인지' },
  { value: 'INDUCTION', label: '인덕션' },
  { value: 'DESK', label: '책상' },
  { value: 'CLOSET', label: '옷장' },
  { value: 'BED', label: '침대' },
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
  features: Yup.array().of(Yup.string()).max(10, '최대 10개의 특징만 선택할 수 있습니다'),
  description: Yup.string().max(1000, '1000자 이내로 입력해주세요'),
  images: Yup.array().of(Yup.mixed()).max(10, '최대 10개의 이미지만 업로드할 수 있습니다'),
});

const PropertyEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { property, updateProperty, isLoading } = useProperty(id);

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
      features: [],
      description: '',
      images: [],
    },
    validationSchema,
    onSubmit: async (values: FormValues) => {
      try {
        setIsSubmitting(true);
        setError(null);
        
        const propertyData: Partial<Property> = {
          ...values,
          price: Number(values.price),
          size: Number(values.size),
          maintenanceFee: values.maintenanceFee ? Number(values.maintenanceFee) : undefined,
        };

        if (id) {
          await updateProperty(id, propertyData);
        }
        
        navigate('/properties');
      } catch (err) {
        setError('매물 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (property) {
      formik.setValues({
        title: property.title,
        type: property.type,
        status: property.status,
        address: property.address,
        latitude: property.latitude,
        longitude: property.longitude,
        price: property.price.toString(),
        size: property.size.toString(),
        maintenanceFee: property.maintenanceFee?.toString() || '',
        parking: property.parking || '',
        moveInDate: property.moveInDate,
        features: property.features || [],
        description: property.description || '',
        images: property.images || [],
      });
    }
  }, [property]);

  const handleAddressSelect = (address: string, latitude: number, longitude: number) => {
    formik.setFieldValue('address', address);
    formik.setFieldValue('latitude', latitude);
    formik.setFieldValue('longitude', longitude);
  };

  const handleNext = () => {
    const currentStepFields = getStepFields(activeStep);
    const currentStepValues = currentStepFields.reduce<Partial<FormValues>>((acc, field) => {
      acc[field] = formik.values[field as keyof FormValues];
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

    currentStepSchema
      .validate(currentStepValues, { abortEarly: false })
      .then(() => {
        setActiveStep((prev) => prev + 1);
      })
      .catch((err: Yup.ValidationError) => {
        const errors = err.inner.reduce<Record<string, string>>((acc, error) => {
          if (error.path) {
            acc[error.path] = error.message;
          }
          return acc;
        }, {});
        formik.setErrors(errors);
      });
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

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
                label="가격"
                type="number"
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
                inputProps={{
                  onFocus: (e) => e.target.select()
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">만원</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="면적"
                type="number"
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
                inputProps={{
                  onFocus: (e) => e.target.select()
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">㎡</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="관리비"
                type="number"
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
                inputProps={{
                  onFocus: (e) => e.target.select()
                }}
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
                minDate={new Date()}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {propertyFeatures.map((feature) => (
                  <Button
                    key={feature.value}
                    variant={formik.values.features.includes(feature.value) ? 'contained' : 'outlined'}
                    onClick={() => {
                      const newFeatures = formik.values.features.includes(feature.value)
                        ? formik.values.features.filter((f) => f !== feature.value)
                        : [...formik.values.features, feature.value];
                      formik.setFieldValue('features', newFeatures);
                    }}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      minWidth: 'auto',
                      px: 2,
                    }}
                  >
                    {feature.label}
                  </Button>
                ))}
              </Box>
              {formik.touched.features && formik.errors.features && (
                <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                  {typeof formik.errors.features === 'string' ? formik.errors.features : '특징을 선택해주세요'}
                </Typography>
              )}
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
              <FileUpload
                files={formik.values.images}
                onChange={(files) => formik.setFieldValue('images', files)}
                error={formik.touched.images && Boolean(formik.errors.images)}
                helperText={typeof formik.errors.images === 'string' ? formik.errors.images : undefined}
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
    <EditFormLayout
      title="매물 수정"
      steps={steps}
      activeStep={activeStep}
      error={error}
      isSubmitting={isSubmitting}
      onBack={activeStep > 0 ? handleBack : undefined}
      onNext={activeStep < steps.length - 1 ? handleNext : undefined}
      onSubmit={activeStep === steps.length - 1 ? formik.handleSubmit : undefined}
    >
      {renderStepContent(activeStep)}
    </EditFormLayout>
  );
};

export default PropertyEdit; 