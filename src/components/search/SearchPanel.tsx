import React from 'react';
import { Box, TextField, MenuItem, Tooltip, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { SearchField } from '../../types/common';

interface SearchPanelProps {
  fields: SearchField[];
  onSearch: (values: Record<string, string>) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ fields, onSearch }) => {
  const [values, setValues] = React.useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(values);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        alignItems: 'flex-end'
      }}
    >
      {fields.map((field) => (
        <Tooltip key={field.name} title={field.tooltip || ''}>
          {field.type === 'select' ? (
            <TextField
              select
              label={field.label}
              value={values[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              sx={{ minWidth: 200 }}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              label={field.label}
              value={values[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              sx={{ minWidth: 200 }}
            />
          )}
        </Tooltip>
      ))}
      <IconButton type="submit" color="primary">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

import React from 'react';
import { Box, TextField, MenuItem, Tooltip, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchField {
  name: string;
  label: string;
  type: 'text' | 'select';
  options?: { value: string; label: string }[];
  tooltip?: string;
}

interface SearchPanelProps {
  fields: SearchField[];
  onSearch: (values: Record<string, string>) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ fields, onSearch }) => {
  const [values, setValues] = React.useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(values);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        alignItems: 'flex-end'
      }}
    >
      {fields.map((field) => (
        <Tooltip key={field.name} title={field.tooltip || ''}>
          {field.type === 'select' ? (
            <TextField
              select
              label={field.label}
              value={values[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              sx={{ minWidth: 200 }}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              label={field.label}
              value={values[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              sx={{ minWidth: 200 }}
            />
          )}
        </Tooltip>
      ))}
      <IconButton type="submit" color="primary">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchPanel; 