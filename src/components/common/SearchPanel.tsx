import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Collapse,
  Paper,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

interface SearchPanelProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange?: (filters: Record<string, any>) => void;
  filterFields?: {
    name: string;
    label: string;
    type: 'text' | 'select' | 'date';
    options?: { value: string; label: string }[];
  }[];
}

const SearchPanel = ({ onSearch, onFilterChange, filterFields = [] }: SearchPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleFilterChange = (name: string, value: any) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
        >
          검색
        </Button>
        {filterFields.length > 0 && (
          <IconButton
            onClick={() => setShowFilters(!showFilters)}
            color={showFilters ? 'primary' : 'default'}
          >
            <FilterListIcon />
          </IconButton>
        )}
      </Box>

      <Collapse in={showFilters}>
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {filterFields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              value={filters[field.name] || ''}
              onChange={(e) => handleFilterChange(field.name, e.target.value)}
              select={field.type === 'select'}
              type={field.type === 'date' ? 'date' : 'text'}
              InputLabelProps={{
                shrink: field.type === 'date',
              }}
              sx={{ minWidth: 200 }}
            >
              {field.type === 'select' &&
                field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </TextField>
          ))}
          {showFilters && (
            <IconButton
              onClick={() => {
                setShowFilters(false);
                setFilters({});
                onFilterChange?.({});
              }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default SearchPanel; 