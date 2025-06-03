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
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import KakaoAddressSearch from '../../components/common/KakaoAddressSearch';
import DatePicker from '../../components/common/DatePicker';
import FileUpload from '../../components/common/FileUpload';
import { formatArea } from '../../utils/areaConverter';
import {
  DirectionsBus,
  LocalHospital,
  School,
  Store,
  Train,
  Elevator,
  LocalParking,
  Security,
  Videocam,
  Balcony,
  AcUnit,
  LocalLaundryService,
  Kitchen,
  LocalGasStation,
  ElectricBolt,
  MenuBook,
  Checkroom,
  Hotel,
  Pets,
  VolumeOff,
  ArrowBack,
} from '@mui/icons-material';

interface FormValues {
  title: string;
  type: string;
  contractType: string;
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
  direction: string;
  floor: string;
  year: string;
  structure: string;
  status: string;
  agent: string;
  contact: string;
}

const propertyTypes = [
  '아파트',
  '오피스텔',
  '주택',
  '상가',
  '사무실',
  '기타',
];

const contractTypes = [
  { value: 'sale', label: '매매' },
  { value: 'monthlyRent', label: '월세' },
  { value: 'yearRent', label: '전세' },
];

const propertyStatuses = [
  '임대중',
  '계약대기',
  '임대가능',
];

const steps = ['기본 정보', '상세 정보', '추가 정보'];

const buildingDirections = [
  { value: 'EAST', label: '동향' },
  { value: 'WEST', label: '서향' },
  { value: 'SOUTH', label: '남향' },
  { value: 'NORTH', label: '북향' },
  { value: 'SOUTHEAST', label: '남동향' },
  { value: 'SOUTHWEST', label: '남서향' },
  { value: 'NORTHEAST', label: '북동향' },
  { value: 'NORTHWEST', label: '북서향' },
];

const buildingStructures = [
  { value: 'CONCRETE', label: '철근콘크리트' },
  { value: 'STEEL_FRAME', label: '철골구조' },
  { value: 'WOOD', label: '목구조' },
  { value: 'MIXED', label: '혼합구조' },
];

const validationSchema = Yup.object({
  title: Yup.string().required('매물 제목을 입력해주세요').max(100, '100자 이내로 입력해주세요'),
  type: Yup.string().required('매물 유형을 선택해주세요'),
  contractType: Yup.string().required('계약 형태를 선택해주세요'),
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
  features: Yup.array().of(Yup.string()).max(200, '200자 이내로 입력해주세요'),
  description: Yup.string().max(1000, '1000자 이내로 입력해주세요'),
  images: Yup.array().of(Yup.mixed()).max(10, '최대 10개의 이미지만 업로드할 수 있습니다'),
  direction: Yup.string().required('건물 방향을 선택해주세요'),
  floor: Yup.string().required('건물 층수를 입력해주세요'),
  year: Yup.string().required('건물 연식을 입력해주세요'),
  structure: Yup.string().required('건물 구조를 선택해주세요'),
  status: Yup.string().required('상태를 선택해주세요'),
  agent: Yup.string().required('담당자를 입력해주세요'),
  contact: Yup.string().required('연락처를 입력해주세요'),
});

const propertyFeatures = [
  // 위치/교통
  { category: 'location', value: 'NEAR_STATION', label: '역세권', icon: <Train /> },
  { category: 'location', value: 'NEAR_BUS', label: '버스정류장', icon: <DirectionsBus /> },
  { category: 'location', value: 'NEAR_SCHOOL', label: '학교근처', icon: <School /> },
  { category: 'location', value: 'NEAR_MART', label: '마트근처', icon: <Store /> },
  { category: 'location', value: 'NEAR_HOSPITAL', label: '병원근처', icon: <LocalHospital /> },
  
  // 건물/시설
  { category: 'building', value: 'ELEVATOR', label: '엘리베이터', icon: <Elevator /> },
  { category: 'building', value: 'PARKING', label: '주차가능', icon: <LocalParking /> },
  { category: 'building', value: 'SECURITY', label: '보안시설', icon: <Security /> },
  { category: 'building', value: 'CCTV', label: 'CCTV', icon: <Videocam /> },
  { category: 'building', value: 'BALCONY', label: '베란다', icon: <Balcony /> },
  
  // 인테리어/가전
  { category: 'interior', value: 'AIR_CONDITIONER', label: '에어컨', icon: <AcUnit /> },
  { category: 'interior', value: 'WASHING_MACHINE', label: '세탁기', icon: <LocalLaundryService /> },
  { category: 'interior', value: 'REFRIGERATOR', label: '냉장고', icon: <Kitchen /> },
  { category: 'interior', value: 'GAS_RANGE', label: '가스레인지', icon: <LocalGasStation /> },
  { category: 'interior', value: 'INDUCTION', label: '인덕션', icon: <ElectricBolt /> },
  
  // 생활편의
  { category: 'convenience', value: 'DESK', label: '책상', icon: <MenuBook /> },
  { category: 'convenience', value: 'CLOSET', label: '옷장', icon: <Checkroom /> },
  { category: 'convenience', value: 'BED', label: '침대', icon: <Hotel /> },
  { category: 'convenience', value: 'PET_FRIENDLY', label: '반려동물', icon: <Pets /> },
  { category: 'convenience', value: 'QUIET_AREA', label: '조용한 동네', icon: <VolumeOff /> },
];

const PropertyForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormValues>({
    title: '',
    type: '',
    contractType: 'monthlyRent',
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
    direction: '',
    floor: '',
    year: '',
    structure: '',
    status: '',
    agent: '',
    contact: '',
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      type: '',
      contractType: 'monthlyRent',
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
      direction: '',
      floor: '',
      year: '',
      structure: '',
      status: '',
      agent: '',
      contact: '',
    } as FormValues,
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
      if (field in formik.values) {
        acc[field] = formik.values[field];
      }
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
        return ['title', 'type', 'contractType', 'address'];
      case 1:
        return ['price', 'size', 'maintenanceFee', 'parking', 'moveInDate', 'direction', 'floor', 'year', 'structure'];
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
                label="계약 형태"
                name="contractType"
                value={formik.values.contractType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.contractType && Boolean(formik.errors.contractType)}
                helperText={formik.touched.contractType && formik.errors.contractType}
                required
              >
                {contractTypes.map((option) => (
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="price"
                label="가격"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.errors.price && formik.touched.price}
                helperText={formik.errors.price && formik.touched.price ? formik.errors.price : ''}
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
                helperText={
                  formik.touched.size && formik.errors.size
                    ? formik.errors.size
                    : formik.values.size
                    ? formatArea(Number(formik.values.size))
                    : undefined
                }
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
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!formik.errors.direction && formik.touched.direction}>
                <InputLabel>건물 방향</InputLabel>
                <Select
                  name="direction"
                  value={formik.values.direction}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="건물 방향"
                >
                  {buildingDirections.map((direction) => (
                    <MenuItem key={direction.value} value={direction.value}>
                      {direction.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.errors.direction && formik.touched.direction && (
                  <FormHelperText>{formik.errors.direction}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="floor"
                label="건물 층수"
                value={formik.values.floor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.errors.floor && formik.touched.floor}
                helperText={formik.errors.floor && formik.touched.floor ? formik.errors.floor : ''}
                placeholder="예: 3층"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="year"
                label="건물 연식"
                value={formik.values.year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.errors.year && formik.touched.year}
                helperText={formik.errors.year && formik.touched.year ? formik.errors.year : ''}
                placeholder="예: 2015년"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!formik.errors.structure && formik.touched.structure}>
                <InputLabel>건물 구조</InputLabel>
                <Select
                  name="structure"
                  value={formik.values.structure}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="건물 구조"
                >
                  {buildingStructures.map((structure) => (
                    <MenuItem key={structure.value} value={structure.value}>
                      {structure.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.errors.structure && formik.touched.structure && (
                  <FormHelperText>{formik.errors.structure}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                특징 선택
              </Typography>
              <Box sx={{ mb: 2 }}>
                {['location', 'building', 'interior', 'convenience'].map((category) => (
                  <Box key={category} sx={{ mb: 4 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 'medium',
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      {category === 'location' && '위치/교통'}
                      {category === 'building' && '건물/시설'}
                      {category === 'interior' && '인테리어/가전'}
                      {category === 'convenience' && '생활편의'}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 1.5,
                      '& .MuiButton-root': {
                        borderRadius: 2,
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 2,
                        py: 1.5,
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 2,
                        },
                        '& .MuiButton-startIcon': {
                          marginRight: 1,
                          '& .MuiSvgIcon-root': {
                            fontSize: 20,
                          },
                        },
                      },
                    }}>
                      {propertyFeatures
                        .filter((feature) => feature.category === category)
                        .map((feature) => (
                          <Button
                            key={feature.value}
                            variant={formik.values.features.includes(feature.value) ? 'contained' : 'outlined'}
                            onClick={() => {
                              const newFeatures = formik.values.features.includes(feature.value)
                                ? formik.values.features.filter((f: string) => f !== feature.value)
                                : [...formik.values.features, feature.value];
                              formik.setFieldValue('features', newFeatures);
                            }}
                            startIcon={feature.icon}
                            sx={{
                              ...(formik.values.features.includes(feature.value) && {
                                backgroundColor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: 'primary.dark',
                                },
                              }),
                            }}
                          >
                            {feature.label}
                          </Button>
                        ))}
                    </Box>
                  </Box>
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
              <Typography variant="subtitle1" gutterBottom>
                매물 사진
              </Typography>
              <FileUpload
                files={formik.values.images}
                onChange={(files) => formik.setFieldValue('images', files)}
                error={formik.touched.images && Boolean(formik.errors.images)}
                helperText={formik.touched.images && formik.errors.images ? String(formik.errors.images) : undefined}
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeaturesChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      features: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement form submission
    console.log('Form data:', formData);
    navigate('/properties');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">매물 등록</Typography>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/properties')}
            startIcon={<ArrowBack />}
          >
            매물 관리로 이동
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

        <form onSubmit={handleSubmit}>
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

export default PropertyForm; 