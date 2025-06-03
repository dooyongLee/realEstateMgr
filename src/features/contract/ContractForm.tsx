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
  SelectChangeEvent,
} from '@mui/material';
import { Info as InfoIcon, ArrowBack } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import PropertySearch from '@/components/common/PropertySearch';
import CustomerSearch from '@/components/common/CustomerSearch';
import FileUpload from '@/components/common/FileUpload';
import { ContractType, ContractStatus, ContractFormData } from '@/types/contract';
import { contracts } from '../../mocks/contracts';

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
  const contract = contracts[0]; // Using the first contract as an example

  const [formData, setFormData] = useState<ContractFormData>({
    propertyId: 0,
    customerId: 0,
    type: 'SALE',
    startDate: new Date(),
    price: 0,
    deposit: 0,
    monthlyRent: 0,
    commission: 0,
    description: '',
    terms: [],
    documents: [],
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'propertyId' || name === 'customerId' || name === 'price' || name === 'deposit' || name === 'monthlyRent' || name === 'commission'
        ? Number(value)
        : value,
    }));
  };

  const handleDateChange = (name: string) => (date: Date | null) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        [name]: date,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contract creation logic
    navigate('/contracts');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          계약 등록
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="매물 ID"
                name="propertyId"
                type="number"
                value={formData.propertyId}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="고객 ID"
                name="customerId"
                type="number"
                value={formData.customerId}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>계약 유형</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="계약 유형"
                >
                  <MenuItem value="SALE">매매</MenuItem>
                  <MenuItem value="LEASE">전세</MenuItem>
                  <MenuItem value="RENT">월세</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="시작일"
                value={formData.startDate}
                onChange={handleDateChange('startDate')}
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="가격"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="보증금"
                name="deposit"
                type="number"
                value={formData.deposit}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="월세"
                name="monthlyRent"
                type="number"
                value={formData.monthlyRent}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="수수료"
                name="commission"
                type="number"
                value={formData.commission}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="설명"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="계약 조건"
                name="terms"
                value={formData.terms.join('\n')}
                onChange={(e) => {
                  const terms = e.target.value.split('\n').filter(Boolean);
                  setFormData((prev) => ({
                    ...prev,
                    terms,
                  }));
                }}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="비고"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/contracts')}
                >
                  취소
                </Button>
                <Button type="submit" variant="contained">
                  저장
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ContractForm;
