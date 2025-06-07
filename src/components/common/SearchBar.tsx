import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
  onClear: () => void;
  searchType?: 'title' | 'content' | 'author';
  onSearchTypeChange?: (type: 'title' | 'content' | 'author') => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onSearch,
  onClear,
  searchType = 'title',
  onSearchTypeChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleClear = () => {
    onClear();
  };

  const handleSearchTypeChange = (event: any) => {
    if (onSearchTypeChange) {
      onSearchTypeChange(event.target.value);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      {onSearchTypeChange && (
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>검색 유형</InputLabel>
          <Select
            value={searchType}
            label="검색 유형"
            onChange={handleSearchTypeChange}
            size="small"
          >
            <MenuItem value="title">제목</MenuItem>
            <MenuItem value="content">내용</MenuItem>
            <MenuItem value="author">작성자</MenuItem>
          </Select>
        </FormControl>
      )}
      <TextField
        fullWidth
        size="small"
        placeholder="검색어를 입력하세요"
        value={value}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar; 