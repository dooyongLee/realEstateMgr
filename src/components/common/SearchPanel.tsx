import { useState } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchPanelProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export const SearchPanel = ({ placeholder = '검색어를 입력하세요', onSearch }: SearchPanelProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchPanel; 