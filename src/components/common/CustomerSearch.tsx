import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface CustomerSearchProps {
  value: number;
  onChange: (id: number) => void;
  error?: boolean;
  helperText?: string;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({
  value,
  onChange,
  error,
  helperText,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    const fetchCustomers = async () => {
      setLoading(true);
      try {
        // TODO: API 호출로 변경
        // 임시 데이터
        const response = await new Promise<Customer[]>((resolve) => {
          setTimeout(() => {
            resolve([
              { id: 1, name: '홍길동', phone: '010-1234-5678', email: 'hong@example.com' },
              { id: 2, name: '김철수', phone: '010-2345-6789', email: 'kim@example.com' },
              { id: 3, name: '이영희', phone: '010-3456-7890', email: 'lee@example.com' },
            ].filter(customer => 
              customer.name.includes(inputValue) ||
              customer.phone.includes(inputValue) ||
              customer.email.includes(inputValue)
            ));
          }, 500);
        });

        if (active) {
          setOptions(response);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchCustomers, 300);
    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  const selectedCustomer = options.find((customer) => customer.id === value);

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      value={selectedCustomer || null}
      onChange={(_, newValue) => {
        onChange(newValue?.id || 0);
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        return option.name;
      }}
      options={options}
      loading={loading}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="고객 검색"
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
            <Typography variant="body1">{option.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {option.phone} • {option.email}
            </Typography>
          </Box>
        </Box>
      )}
    />
  );
};

export default CustomerSearch; 