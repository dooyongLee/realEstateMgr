import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, MenuItem, InputAdornment, Box, Button, Typography, Card, CardContent, FormControl, InputLabel, Select, Chip, OutlinedInput, SelectChangeEvent } from '@mui/material';
import EditFormLayout from '@/components/layout/EditFormLayout';
import KakaoAddressSearch from '@/components/common/KakaoAddressSearch';
import DatePicker from '@/components/common/DatePicker';
import FileUpload from '@/components/common/FileUpload';
import { useProperty } from '@/hooks/useProperty';
import { Property } from '@/types/property';
import { properties } from '../../mocks/properties';

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
  '아파트',
  '오피스텔',
  '주택',
  '상가',
  '사무실',
  '기타',
];

const propertyStatuses = [
  '임대중',
  '계약대기',
  '임대가능',
];

const propertyFeatures = [
  '주차장',
  'CCTV',
  '엘리베이터',
  '보안시스템',
  '헬스장',
  '수영장',
  '공용주방',
  '세탁실',
  '공용화장실',
  '공용샤워실',
  '공용거실',
  '공용주방',
  '공용세탁실',
  '공용다용도실',
  '공용휴게실',
  '공용독서실',
  '공용컴퓨터실',
  '공용프린터실',
  '공용회의실',
  '공용강의실',
  '공용연습실',
  '공용스튜디오',
  '공용작업실',
  '공용창고',
  '공용주차장',
  '공용운동장',
  '공용정원',
  '공용테라스',
  '공용발코니',
  '공용옥상',
  '공용지하실',
  '공용창고',
  '공용주차장',
  '공용운동장',
  '공용정원',
  '공용테라스',
  '공용발코니',
  '공용옥상',
  '공용지하실',
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
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    price: '',
    status: '',
    description: '',
    features: [] as string[],
    availableDate: '',
    agent: '',
    contact: '',
  });

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
    const property = properties.find((p) => p.id === Number(id));
    if (property) {
      setFormData({
        name: property.name,
        type: property.type,
        address: property.address,
        price: property.price.toString(),
        status: property.status,
        description: property.description,
        features: property.features,
        availableDate: property.availableDate,
        agent: property.agent,
        contact: property.contact,
      });
    }
  }, [id]);

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
                  <MenuItem key={option} value={option}>
                    {option}
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
                  <MenuItem key={option} value={option}>
                    {option}
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
                    key={feature}
                    variant={formik.values.features.includes(feature) ? 'contained' : 'outlined'}
                    onClick={() => {
                      const newFeatures = formik.values.features.includes(feature)
                        ? formik.values.features.filter((f) => f !== feature)
                        : [...formik.values.features, feature];
                      formik.setFieldValue('features', newFeatures);
                    }}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      minWidth: 'auto',
                      px: 2,
                    }}
                  >
                    {feature}
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