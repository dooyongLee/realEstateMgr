import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { ko } from 'date-fns/locale';

interface DatePickerProps extends Omit<TextFieldProps, 'onChange'> {
  value: string;
  onChange: (date: string) => void;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  error,
  helperText,
  label,
  required,
  ...props
}) => {
  const handleChange = (newValue: Date | null) => {
    if (newValue) {
      // YYYY-MM-DD 형식으로 변환
      const year = newValue.getFullYear();
      const month = String(newValue.getMonth() + 1).padStart(2, '0');
      const day = String(newValue.getDate()).padStart(2, '0');
      onChange(`${year}-${month}-${day}`);
    } else {
      onChange('');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <MuiDatePicker
        label={label}
        value={value ? new Date(value) : null}
        onChange={handleChange}
        minDate={minDate}
        maxDate={maxDate}
        slotProps={{
          textField: {
            fullWidth: true,
            error: error,
            helperText: helperText,
            required: required,
            ...props,
          },
        }}
        format="yyyy년 MM월 dd일"
        sx={{
          '& .MuiInputBase-root': {
            height: '56px',
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker; 