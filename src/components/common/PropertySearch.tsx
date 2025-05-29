import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import { Property } from '@/types/property';

interface PropertySearchProps {
  value: number;
  onChange: (id: number) => void;
  error?: boolean;
  helperText?: string;
}

const PropertySearch: React.FC<PropertySearchProps> = ({
  value,
  onChange,
  error,
  helperText,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    const fetchProperties = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const response = await fetch(`/api/properties/search?q=${inputValue}`);
        const data = await response.json();
        if (active) {
          setOptions(data);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchProperties, 300);
    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      value={options.find((option) => option.id === value) || null}
      onChange={(_, newValue) => {
        onChange(newValue?.id || 0);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => `${option.title} (${option.address})`}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="매물 검색"
          required
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Box>
            <Typography variant="body1">{option.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {option.address}
            </Typography>
          </Box>
        </Box>
      )}
    />
  );
};

export default PropertySearch; 