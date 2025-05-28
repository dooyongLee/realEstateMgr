import { Box, TextField, InputAdornment, IconButton, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon, Add as AddIcon } from '@mui/icons-material';
import { useState } from 'react';

export interface SearchCondition {
  field: string;
  label: string;
  type: 'text' | 'select';
  options?: { value: string; label: string }[];
}

interface SearchPanelProps {
  title?: string;
  onSearch: (searchValue: string, conditions: Record<string, string>) => void;
  onAdd?: () => void;
  placeholder?: string;
  addButtonLabel?: string;
  conditions?: SearchCondition[];
  defaultConditions?: Record<string, string>;
}

const SearchPanel = ({
  title,
  onSearch,
  onAdd,
  placeholder = '검색어를 입력하세요',
  addButtonLabel = 'Add',
  conditions = [],
  defaultConditions = {},
}: SearchPanelProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<Record<string, string>>(defaultConditions);

  const handleSearch = () => {
    onSearch(searchValue, selectedConditions);
  };

  const handleClear = () => {
    setSearchValue('');
    setSelectedConditions(defaultConditions);
    onSearch('', defaultConditions);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleConditionChange = (field: string, value: string) => {
    setSelectedConditions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2,
        height: '60px',
      }}
    >
      {conditions.map((condition) => (
        <FormControl
          key={condition.field}
          size="small"
          sx={{ minWidth: 120, maxWidth: 200 }}
        >
          {condition.type === 'select' ? (
            <>
              <InputLabel>{condition.label}</InputLabel>
              <Select
                value={selectedConditions[condition.field] || ''}
                label={condition.label}
                onChange={(e) => handleConditionChange(condition.field, e.target.value)}
                size="small"
              >
                {condition.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </>
          ) : (
            <TextField
              label={condition.label}
              value={selectedConditions[condition.field] || ''}
              onChange={(e) => handleConditionChange(condition.field, e.target.value)}
              size="small"
            />
          )}
        </FormControl>
      ))}
      <TextField
        fullWidth
        size="small"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
        size="large"
      >
        Search
      </Button>
      {onAdd && (
        <Button
          variant="contained"
          onClick={onAdd}
          startIcon={<AddIcon />}
          size="large"
        >
          {addButtonLabel}
        </Button>
      )}
    </Box>
  );
};

export default SearchPanel; 