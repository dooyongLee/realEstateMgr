import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

interface TableToolbarProps {
  onSearch?: (value: string) => void;
  onRefresh?: () => void;
  onFilter?: () => void;
  searchPlaceholder?: string;
  showFilter?: boolean;
  actions?: React.ReactNode;
  searchValue?: string;
}

const TableToolbar: React.FC<TableToolbarProps> = ({
  onSearch,
  onRefresh,
  onFilter,
  searchPlaceholder = '검색',
  showFilter = true,
  actions,
  searchValue = '',
}) => {
  const [search, setSearch] = React.useState(searchValue);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    onSearch?.(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flex: 1 }}>
        {onSearch && (
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
        )}
        {showFilter && onFilter && (
          <Tooltip title="필터">
            <IconButton onClick={onFilter}>
              <FilterIcon />
            </IconButton>
          </Tooltip>
        )}
        {onRefresh && (
          <Tooltip title="새로고침">
            <IconButton onClick={onRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {actions && (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {actions}
        </Box>
      )}
    </Box>
  );
};

export default TableToolbar; 