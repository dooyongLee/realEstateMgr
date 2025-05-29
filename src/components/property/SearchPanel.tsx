import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchFilters {
  keyword: string;
  type: string;
  contractType: string;
  minPrice: string;
  maxPrice: string;
  minSize: string;
  maxSize: string;
}

interface SearchPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onSearch: () => void;
}

const propertyTypes = [
  { value: 'APARTMENT', label: '아파트' },
  { value: 'HOUSE', label: '주택' },
  { value: 'COMMERCIAL', label: '상가' },
  { value: 'OFFICE', label: '사무실' },
];

const contractTypes = [
  { value: 'sale', label: '매매' },
  { value: 'monthlyRent', label: '월세' },
  { value: 'yearRent', label: '전세' },
];

const SearchPanel: React.FC<SearchPanelProps> = ({ filters, onFilterChange, onSearch }) => {
  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    if (name) {
      onFilterChange({
        ...filters,
        [name]: value,
      });
    }
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="검색어"
            name="keyword"
            value={filters.keyword}
            onChange={handleFilterChange}
            placeholder="매물명, 주소 검색"
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>매물 유형</InputLabel>
            <Select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              label="매물 유형"
            >
              <MenuItem value="">전체</MenuItem>
              {propertyTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>계약 형태</InputLabel>
            <Select
              name="contractType"
              value={filters.contractType}
              onChange={handleFilterChange}
              label="계약 형태"
            >
              <MenuItem value="">전체</MenuItem>
              {contractTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              label="최소 가격"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              type="number"
              InputProps={{
                endAdornment: <span>만원</span>,
              }}
            />
            <TextField
              fullWidth
              label="최대 가격"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              type="number"
              InputProps={{
                endAdornment: <span>만원</span>,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              label="최소 면적"
              name="minSize"
              value={filters.minSize}
              onChange={handleFilterChange}
              type="number"
              InputProps={{
                endAdornment: <span>㎡</span>,
              }}
            />
            <TextField
              fullWidth
              label="최대 면적"
              name="maxSize"
              value={filters.maxSize}
              onChange={handleFilterChange}
              type="number"
              InputProps={{
                endAdornment: <span>㎡</span>,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={onSearch}
              sx={{ minWidth: 120 }}
            >
              검색
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchPanel; 