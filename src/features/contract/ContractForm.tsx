import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Button,
  Alert,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import { Info as InfoIcon, ArrowBack } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import PropertySearch from '@/components/common/PropertySearch';
import CustomerSearch from '@/components/common/CustomerSearch';
import FileUpload from '@/components/common/FileUpload';
import { ContractType, ContractFormData } from '@/types/contract';

const contractTypes = [
  { value: 'SALE', label: '매매' },
  { value: 'LEASE', label: '전세' },
  { value: 'RENT', label: '월세' },
];

const steps = ['기본 정보', '계약 조건', '서류 및 특이사항'];

const validationSchema = Yup.object({
  propertyId: Yup.number().required('매물을 선택해주세요'),
  customerId: Yup.number().required('고객을 선택해주세요'),
  type: Yup.string().required('계약 유형을 선택해주세요'),
  startDate: Yup.date().required('계약 시작일을 선택해주세요'),
  price: Yup.number()
    .required('가격을 입력해주세요')
    .min(0, '0 이상의 값을 입력해주세요'),
  deposit: Yup.number()
    .required('보증금을 입력해주세요')
    .min(0, '0 이상의 값을 입력해주세요'),
  monthlyRent: Yup.number()
    .when('type', {
      is: 'RENT',
      then: (schema) => schema.required('월세를 입력해주세요').min(0, '0 이상의 값을 입력해주세요'),
    }),
  commission: Yup.number()
    .required('수수료를 입력해주세요')
    .min(0, '0 이상의 값을 입력해주세요'),
  description: Yup.string().required('계약 내용을 입력해주세요'),
  terms: Yup.array().of(Yup.string()).min(1, '최소 1개 이상의 계약 조건을 입력해주세요'),
  documents: Yup.array().of(Yup.mixed()),
  notes: Yup.string(),
});

const calculateCommission = (type: ContractType, price: number, deposit: number, monthlyRent: number = 0) => {
  switch (type) {
    case 'SALE':
      // 매매: 매매가의 0.9%
      return Math.floor(price * 0.009);
    case 'LEASE':
      // 전세: 전세보증금의 0.5%
      return Math.floor(deposit * 0.005);
    case 'RENT':
      // 월세: 보증금의 0.3% + 월세의 5%
      return Math.floor(deposit * 0.003 + monthlyRent * 0.05);
    default:
      return 0;
  }
};

const getCommissionPolicy = (type: ContractType) => {
  switch (type) {
    case 'SALE':
      return '매매: 매매가의 0.9%';
    case 'LEASE':
      return '전세: 전세보증금의 0.5%';
    case 'RENT':
      return '월세: 보증금의 0.3% + 월세의 5%';
    default:
      return '';
  }
};

const ContractForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<ContractFormData>({
    initialValues: {
      propertyId: 0,
      customerId: 0,
      type: 'SALE',
      startDate: null,
      price: 0,
      deposit: 0,
      monthlyRent: 0,
      commission: 0,
      description: '',
      terms: [],
      documents: [],
      notes: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setError(null);
        // TODO: API 호출
        console.log('Form submitted:', values);
        navigate('/contracts');
      } catch (err) {
        setError('계약 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const calculatedCommission = useMemo(() => {
    return calculateCommission(
      formik.values.type,
      formik.values.price,
      formik.values.deposit,
      formik.values.monthlyRent
    );
  }, [formik.values.type, formik.values.price, formik.values.deposit, formik.values.monthlyRent]);

  // 수수료가 변경될 때마다 자동으로 계산된 값으로 업데이트
  React.useEffect(() => {
    formik.setFieldValue('commission', calculatedCommission);
  }, [calculatedCommission]);

  const handleNext = () => {
    const currentStepFields = getStepFields(activeStep);
    const currentStepValues = currentStepFields.reduce<Partial<ContractFormData>>((acc, field) => {
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

  const getStepFields = (step: number): (keyof ContractFormData)[] => {
    switch (step) {
      case 0:
        return ['propertyId', 'customerId', 'type', 'startDate'];
      case 1:
        return ['price', 'deposit', 'monthlyRent', 'commission', 'description'];
      case 2:
        return ['terms', 'documents', 'notes'];
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
              <PropertySearch
                value={formik.values.propertyId}
                onChange={(id) => formik.setFieldValue('propertyId', id)}
                error={formik.touched.propertyId && Boolean(formik.errors.propertyId)}
                helperText={formik.touched.propertyId ? formik.errors.propertyId : undefined}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomerSearch
                value={formik.values.customerId}
                onChange={(id) => formik.setFieldValue('customerId', id)}
                error={formik.touched.customerId && Boolean(formik.errors.customerId)}
                helperText={formik.touched.customerId ? formik.errors.customerId : undefined}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="계약 유형"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
                required
              >
                {contractTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="계약 시작일"
                value={formik.values.startDate}
                onChange={(date) => formik.setFieldValue('startDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.startDate && Boolean(formik.errors.startDate),
                    helperText: formik.touched.startDate ? formik.errors.startDate : undefined,
                    required: true,
                  },
                }}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                required
                InputProps={{
                  endAdornment: <InputAdornment position="end">만원</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="보증금"
                type="number"
                name="deposit"
                value={formik.values.deposit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.deposit && Boolean(formik.errors.deposit)}
                helperText={formik.touched.deposit && formik.errors.deposit}
                required
                InputProps={{
                  endAdornment: <InputAdornment position="end">만원</InputAdornment>,
                }}
              />
            </Grid>
            {formik.values.type === 'RENT' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="월세"
                  type="number"
                  name="monthlyRent"
                  value={formik.values.monthlyRent}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.monthlyRent && Boolean(formik.errors.monthlyRent)}
                  helperText={formik.touched.monthlyRent && formik.errors.monthlyRent}
                  required
                  InputProps={{
                    endAdornment: <InputAdornment position="end">만원</InputAdornment>,
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  fullWidth
                  label="수수료 (자동 계산)"
                  type="number"
                  name="commission"
                  value={formik.values.commission || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.commission && Boolean(formik.errors.commission)}
                  helperText={formik.touched.commission && formik.errors.commission}
                  placeholder="수수료 자동 책정"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">만원</InputAdornment>,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  부동산 중개 수수료 정책
                </Typography>
                <Typography 
                  variant="body2" 
                  color={formik.values.type === 'SALE' ? 'primary' : 'text.secondary'}
                  paragraph
                  sx={{ fontWeight: formik.values.type === 'SALE' ? 'bold' : 'normal' }}
                >
                  • 매매: 매매가의 0.9%
                </Typography>
                <Typography 
                  variant="body2" 
                  color={formik.values.type === 'LEASE' ? 'primary' : 'text.secondary'}
                  paragraph
                  sx={{ fontWeight: formik.values.type === 'LEASE' ? 'bold' : 'normal' }}
                >
                  • 전세: 전세보증금의 0.5%
                </Typography>
                <Typography 
                  variant="body2" 
                  color={formik.values.type === 'RENT' ? 'primary' : 'text.secondary'}
                  sx={{ fontWeight: formik.values.type === 'RENT' ? 'bold' : 'normal' }}
                >
                  • 월세: 보증금의 0.3% + 월세의 5%
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="계약 내용"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                multiline
                rows={4}
                required
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
                label="계약 조건"
                name="terms"
                value={formik.values.terms.join('\n')}
                onChange={(e) => {
                  const terms = e.target.value.split('\n').filter(Boolean);
                  formik.setFieldValue('terms', terms);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.terms && Boolean(formik.errors.terms)}
                helperText={formik.touched.terms && formik.errors.terms}
                multiline
                rows={4}
                placeholder="계약 조건을 한 줄에 하나씩 입력하세요"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FileUpload
                files={formik.values.documents}
                onChange={(files) => formik.setFieldValue('documents', files)}
                error={formik.touched.documents && Boolean(formik.errors.documents)}
                helperText={formik.touched.documents ? formik.errors.documents : undefined}
                maxFiles={10}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="특이사항"
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.notes && Boolean(formik.errors.notes)}
                helperText={formik.touched.notes && formik.errors.notes}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">계약 등록</Typography>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/contracts')}
            startIcon={<ArrowBack />}
          >
            계약 관리로 이동
          </Button>
        </Box>
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
        <form onSubmit={formik.handleSubmit}>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} disabled={isSubmitting}>
                이전
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext} disabled={isSubmitting}>
                다음
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                등록
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ContractForm;
