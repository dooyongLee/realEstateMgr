import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  SxProps,
  Theme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useState, KeyboardEvent } from 'react';
import ActionButton from '../buttons/ActionButton';

export interface SearchPanelProps {
  title?: string;
  onSearch: (value: string) => void;
  onAdd?: () => void;
  placeholder?: string;
  addButtonLabel?: string;
  searchButtonLabel?: string;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  debounceTime?: number;
}

const SearchPanel = ({
  title,
  onSearch,
  onAdd,
  placeholder = '검색어를 입력하세요',
  addButtonLabel = 'Register',
  searchButtonLabel = 'Search',
  sx,
  fullWidth = true,
  size = 'medium',
  debounceTime = 300,
}: SearchPanelProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>();

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
    
    if (debounceTime > 0) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      const timer = setTimeout(() => {
        onSearch(value);
      }, debounceTime);
      setDebounceTimer(timer);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
        <TextField
          fullWidth={fullWidth}
          size={size}
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyPress={handleKeyPress}
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
        <ActionButton
          icon={<SearchIcon />}
          label={searchButtonLabel}
          onClick={handleSearch}
          size={size}
        />
      </Box>
      {onAdd && (
        <ActionButton
          icon={<AddIcon />}
          label={addButtonLabel}
          onClick={onAdd}
          size={size}
        />
      )}
    </Box>
  );
};

export default SearchPanel; 