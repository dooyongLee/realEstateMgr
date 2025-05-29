import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Warning,
  Info,
  ContentCopy,
  ArrowBack,
  Save,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ContractType, ContractStatus } from '@/types/contract';
import { addMonths, differenceInDays, format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';

// 계약 상태 단계 정의
const contractSteps = [
  { id: 'DRAFT', label: '계약서 작성' },
  { id: 'PENDING_REVIEW', label: '검토 중' },
  { id: 'SIGNED', label: '서명 완료' },
  { id: 'COMPLETED', label: '계약 완료' },
];

// 필수 서류 정의
const requiredDocuments: Record<ContractType, Array<{ id: string; name: string; description: string }>> = {
  SALE: [
    { id: 'sale_contract', name: '매매계약서', description: '매매계약서 원본' },
    { id: 'property_cert', name: '부동산등기부등본', description: '최근 발급된 등기부등본' },
    { id: 'tax_cert', name: '세금계산서', description: '양도소득세 계산서' },
    { id: 'commission_cert', name: '중개수수료 영수증', description: '중개수수료 지급 영수증' },
    { id: 'ownership_cert', name: '소유권이전등기필증', description: '소유권 이전 등기 필증' },
  ],
  LEASE: [
    { id: 'lease_contract', name: '전세계약서', description: '전세계약서 원본' },
    { id: 'property_cert', name: '부동산등기부등본', description: '최근 발급된 등기부등본' },
    { id: 'commission_cert', name: '중개수수료 영수증', description: '중개수수료 지급 영수증' },
    { id: 'lease_registration', name: '전세권설정등기필증', description: '전세권 설정 등기 필증' },
  ],
  RENT: [
    { id: 'rent_contract', name: '임대차계약서', description: '임대차계약서 원본' },
    { id: 'property_cert', name: '부동산등기부등본', description: '최근 발급된 등기부등본' },
    { id: 'commission_cert', name: '중개수수료 영수증', description: '중개수수료 지급 영수증' },
    { id: 'rent_registration', name: '임대차계약등록필증', description: '임대차계약 등록 필증' },
  ],
};

interface ContractDocument {
  id: string;
  name: string;
  uploaded: boolean;
  uploadedAt?: string;
}

interface ContractFormValues {
  propertyTitle: string;
  propertyType: string;
  propertySize: string;
  propertyLocation: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  startDate: Date | null;
  contractDate: Date | null;
  deposit: string;
  monthlyRent: string;
  type: ContractType;
  status: ContractStatus;
  description: string;
  terms: string[];
  documents: ContractDocument[];
  notes?: string;
  propertyFloor?: string;
  propertyDirection?: string;
  propertyYear?: string;
  propertyStructure?: string;
}

const validationSchema = Yup.object({
  propertyTitle: Yup.string().required('매물 제목을 입력해주세요'),
  propertyType: Yup.string().required('매물 유형을 선택해주세요'),
  propertySize: Yup.string().required('매물 크기를 입력해주세요'),
  propertyLocation: Yup.string().required('매물 위치를 입력해주세요'),
  tenantName: Yup.string().required('임차인 이름을 입력해주세요'),
  tenantPhone: Yup.string().required('임차인 연락처를 입력해주세요'),
  tenantEmail: Yup.string().email('올바른 이메일 형식이 아닙니다').required('임차인 이메일을 입력해주세요'),
  startDate: Yup.date().required('계약 시작일을 선택해주세요'),
  contractDate: Yup.date().required('계약일을 선택해주세요'),
  deposit: Yup.string().required('보증금을 입력해주세요'),
  monthlyRent: Yup.string().when('type', {
    is: 'RENT',
    then: (schema) => schema.required('월세를 입력해주세요'),
  }),
  type: Yup.string().required('계약 유형을 선택해주세요'),
  status: Yup.string().required('계약 상태를 선택해주세요'),
  description: Yup.string().required('계약 내용을 입력해주세요'),
  terms: Yup.array().of(Yup.string()).min(1, '최소 1개 이상의 계약 조건을 입력해주세요'),
  documents: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required(),
      name: Yup.string().required(),
      uploaded: Yup.boolean().required(),
      uploadedAt: Yup.string(),
    })
  ),
  notes: Yup.string(),
  propertyFloor: Yup.string(),
  propertyDirection: Yup.string(),
  propertyYear: Yup.string(),
  propertyStructure: Yup.string(),
});

// Mock data for development
const mockContract: ContractFormValues = {
  propertyTitle: '강남 아파트',
  propertyType: '아파트',
  propertySize: '84.5㎡',
  propertyLocation: '서울시 강남구',
  tenantName: '홍길동',
  tenantPhone: '010-1234-5678',
  tenantEmail: 'hong@example.com',
  startDate: new Date('2024-03-01'),
  contractDate: new Date('2024-02-20'),
  deposit: '5000만원',
  monthlyRent: '200만원',
  type: 'RENT',
  status: 'SIGNED',
  description: '강남역 도보 5분 거리에 위치한 3룸 아파트입니다.',
  terms: [
    '계약기간: 1년',
    '월세 지불일: 매월 1일',
    '관리비: 월 15만원',
    '주차: 1대 가능',
    '반려동물: 불가능',
  ],
  documents: [
    { id: 'rent_contract', name: '임대차계약서', uploaded: true, uploadedAt: '2024-02-20' },
    { id: 'property_cert', name: '부동산등기부등본', uploaded: true, uploadedAt: '2024-02-20' },
    { id: 'commission_cert', name: '중개수수료 영수증', uploaded: false },
  ],
  notes: '임차인이 반려동물을 키우고 있어서, 계약 시 반려동물 관련 특별 조항을 추가했습니다. 또한 주차 공간이 제한적이어서, 주차 관련 규정을 명확히 했습니다.',
  propertyFloor: '3층',
  propertyDirection: '남향',
  propertyYear: '2015년',
  propertyStructure: '철근콘크리트',
};

const ContractEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  console.log('ContractEdit component mounted', { id });

  React.useEffect(() => {
    console.log('ContractEdit component effect', { id });
  }, [id]);

  const formik = useFormik<ContractFormValues>({
    initialValues: mockContract,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setError(null);
        // TODO: API 호출
        console.log('Form submitted:', values);
        setSnackbar({
          open: true,
          message: '계약이 성공적으로 수정되었습니다.'
        });
        navigate('/contracts');
      } catch (err) {
        setError('계약 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const getStatusColor = (status: ContractStatus) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'SIGNED':
        return 'primary';
      case 'PENDING_REVIEW':
        return 'warning';
      case 'CANCELLED':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const getCurrentStep = (status: ContractStatus) => {
    return contractSteps.findIndex(step => step.id === status);
  };

  const getDocumentStatus = (docId: string) => {
    const doc = formik.values.documents?.find(d => d.id === docId);
    if (!doc) return { icon: <Error color="error" />, text: '미제출' };
    if (doc.uploaded) return { icon: <CheckCircle color="success" />, text: '제출완료' };
    return { icon: <Error color="error" />, text: '미제출' };
  };

  const getDocumentProgress = () => {
    const totalDocs = requiredDocuments[formik.values.type].length;
    const uploadedDocs = formik.values.documents.filter(d => d.uploaded).length;
    return (uploadedDocs / totalDocs) * 100;
  };

  // 계약 만료일 계산
  const isLeaseOrRent = formik.values.type === 'LEASE' || formik.values.type === 'RENT';
  const startDate = formik.values.startDate;
  const endDate = startDate ? addMonths(startDate, 12) : null; // 1년 계약 기준
  const daysUntilExpiry = endDate ? differenceInDays(endDate, new Date()) : 0;
  const showExpiryAlert = isLeaseOrRent && daysUntilExpiry <= 60 && daysUntilExpiry > 0;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">계약 수정</Typography>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/contracts')}
            startIcon={<ArrowBack />}
          >
            계약 관리로 이동
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* 계약 만료 알림 */}
            {showExpiryAlert && (
              <Grid item xs={12}>
                <Alert 
                  severity="warning" 
                  sx={{ 
                    mb: 2,
                    '& .MuiAlert-message': {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }
                  }}
                >
                  <Warning />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      재계약 기간 도래
                    </Typography>
                    <Typography variant="body2">
                      계약 만료일까지 {daysUntilExpiry}일 남았습니다. 재계약 준비를 시작하세요.
                    </Typography>
                  </Box>
                </Alert>
              </Grid>
            )}

            {/* 계약 상태 관리 */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  계약 상태 관리
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
                      <InputLabel>계약 상태</InputLabel>
                      <Select
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        label="계약 상태"
                      >
                        {contractSteps.map((step) => (
                          <MenuItem key={step.id} value={step.id}>
                            {step.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.status && formik.errors.status && (
                        <FormHelperText>{formik.errors.status}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)}>
                      <InputLabel>계약 유형</InputLabel>
                      <Select
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        label="계약 유형"
                      >
                        <MenuItem value="SALE">매매</MenuItem>
                        <MenuItem value="LEASE">전세</MenuItem>
                        <MenuItem value="RENT">월세</MenuItem>
                      </Select>
                      {formik.touched.type && formik.errors.type && (
                        <FormHelperText>{formik.errors.type}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Stepper activeStep={getCurrentStep(formik.values.status)} alternativeLabel sx={{ mt: 3 }}>
                  {contractSteps.map((step) => (
                    <Step key={step.id}>
                      <StepLabel>{step.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
            </Grid>

            {/* 매물 정보 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  매물 정보
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="매물 제목"
                      name="propertyTitle"
                      value={formik.values.propertyTitle}
                      onChange={formik.handleChange}
                      error={formik.touched.propertyTitle && Boolean(formik.errors.propertyTitle)}
                      helperText={formik.touched.propertyTitle && formik.errors.propertyTitle}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="매물 유형"
                      name="propertyType"
                      value={formik.values.propertyType}
                      onChange={formik.handleChange}
                      error={formik.touched.propertyType && Boolean(formik.errors.propertyType)}
                      helperText={formik.touched.propertyType && formik.errors.propertyType}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="전용면적"
                      name="propertySize"
                      value={formik.values.propertySize}
                      onChange={formik.handleChange}
                      error={formik.touched.propertySize && Boolean(formik.errors.propertySize)}
                      helperText={formik.touched.propertySize && formik.errors.propertySize}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="위치"
                      name="propertyLocation"
                      value={formik.values.propertyLocation}
                      onChange={formik.handleChange}
                      error={formik.touched.propertyLocation && Boolean(formik.errors.propertyLocation)}
                      helperText={formik.touched.propertyLocation && formik.errors.propertyLocation}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="설명"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* 건물 상세 정보 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  건물 상세 정보
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="건물 방향"
                      name="propertyDirection"
                      value={formik.values.propertyDirection}
                      onChange={formik.handleChange}
                      error={formik.touched.propertyDirection && Boolean(formik.errors.propertyDirection)}
                      helperText={formik.touched.propertyDirection && formik.errors.propertyDirection}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="건물 층수"
                      name="propertyFloor"
                      value={formik.values.propertyFloor}
                      onChange={formik.handleChange}
                      error={formik.touched.propertyFloor && Boolean(formik.errors.propertyFloor)}
                      helperText={formik.touched.propertyFloor && formik.errors.propertyFloor}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="건물 연식"
                      name="propertyYear"
                      value={formik.values.propertyYear}
                      onChange={formik.handleChange}
                      error={formik.touched.propertyYear && Boolean(formik.errors.propertyYear)}
                      helperText={formik.touched.propertyYear && formik.errors.propertyYear}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="건물 구조"
                      name="propertyStructure"
                      value={formik.values.propertyStructure}
                      onChange={formik.handleChange}
                      error={formik.touched.propertyStructure && Boolean(formik.errors.propertyStructure)}
                      helperText={formik.touched.propertyStructure && formik.errors.propertyStructure}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* 임차인 정보 */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  임차인 정보
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="이름"
                      name="tenantName"
                      value={formik.values.tenantName}
                      onChange={formik.handleChange}
                      error={formik.touched.tenantName && Boolean(formik.errors.tenantName)}
                      helperText={formik.touched.tenantName && formik.errors.tenantName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="연락처"
                      name="tenantPhone"
                      value={formik.values.tenantPhone}
                      onChange={formik.handleChange}
                      error={formik.touched.tenantPhone && Boolean(formik.errors.tenantPhone)}
                      helperText={formik.touched.tenantPhone && formik.errors.tenantPhone}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="이메일"
                      name="tenantEmail"
                      value={formik.values.tenantEmail}
                      onChange={formik.handleChange}
                      error={formik.touched.tenantEmail && Boolean(formik.errors.tenantEmail)}
                      helperText={formik.touched.tenantEmail && formik.errors.tenantEmail}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* 계약 정보 */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  계약 정보
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <DatePicker
                      label="계약 시작일"
                      value={formik.values.startDate}
                      onChange={(date) => formik.setFieldValue('startDate', date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: formik.touched.startDate && Boolean(formik.errors.startDate),
                          helperText: formik.touched.startDate && formik.errors.startDate,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <DatePicker
                      label="계약일"
                      value={formik.values.contractDate}
                      onChange={(date) => formik.setFieldValue('contractDate', date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: formik.touched.contractDate && Boolean(formik.errors.contractDate),
                          helperText: formik.touched.contractDate && formik.errors.contractDate,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="보증금"
                      name="deposit"
                      value={formik.values.deposit}
                      onChange={formik.handleChange}
                      error={formik.touched.deposit && Boolean(formik.errors.deposit)}
                      helperText={formik.touched.deposit && formik.errors.deposit}
                    />
                  </Grid>
                  {formik.values.type === 'RENT' && (
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="월세"
                        name="monthlyRent"
                        value={formik.values.monthlyRent}
                        onChange={formik.handleChange}
                        error={formik.touched.monthlyRent && Boolean(formik.errors.monthlyRent)}
                        helperText={formik.touched.monthlyRent && formik.errors.monthlyRent}
                      />
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>

            {/* 계약 조건 */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  계약 조건
                </Typography>
                <TextField
                  fullWidth
                  label="계약 조건"
                  name="terms"
                  value={formik.values.terms.join('\n')}
                  onChange={(e) => {
                    const terms = e.target.value.split('\n').filter(Boolean);
                    formik.setFieldValue('terms', terms);
                  }}
                  error={formik.touched.terms && Boolean(formik.errors.terms)}
                  helperText={formik.touched.terms && formik.errors.terms}
                  multiline
                  rows={4}
                  placeholder="계약 조건을 한 줄에 하나씩 입력하세요"
                />
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formik.values.terms.map((term, index) => (
                    <Chip key={index} label={term} />
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* 메모 */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  메모
                </Typography>
                <TextField
                  fullWidth
                  label="메모"
                  name="notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                  multiline
                  rows={4}
                />
              </Paper>
            </Grid>

            {/* 필수 서류 */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  필수 서류
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={getDocumentProgress()} 
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary" align="right">
                    {formik.values.documents.filter(d => d.uploaded).length} / {requiredDocuments[formik.values.type].length} 서류 제출 완료
                  </Typography>
                </Box>
                <List>
                  {requiredDocuments[formik.values.type]?.map((doc) => {
                    const status = getDocumentStatus(doc.id);
                    return (
                      <React.Fragment key={doc.id}>
                        <ListItem>
                          <ListItemIcon>{status.icon}</ListItemIcon>
                          <ListItemText
                            primary={doc.name}
                            secondary={doc.description}
                          />
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                              // TODO: 문서 업로드 로직 구현
                              const updatedDocuments = formik.values.documents.map(d =>
                                d.id === doc.id
                                  ? { ...d, uploaded: !d.uploaded, uploadedAt: !d.uploaded ? format(new Date(), 'yyyy-MM-dd') : undefined }
                                  : d
                              );
                              formik.setFieldValue('documents', updatedDocuments);
                            }}
                          >
                            {status.text === '제출완료' ? '제출 취소' : '제출하기'}
                          </Button>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    );
                  })}
                </List>
              </Paper>
            </Grid>
          </Grid>

          {/* 하단 버튼 */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/contracts')}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={<Save />}
            >
              저장
            </Button>
          </Box>
        </form>
      </Paper>

      {/* 알림 스낵바 */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default ContractEdit; 