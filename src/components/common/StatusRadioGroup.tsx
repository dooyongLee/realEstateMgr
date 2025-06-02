import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

interface StatusRadioGroupProps {
  value: 'active' | 'inactive';
  onChange: (value: 'active' | 'inactive') => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

const StatusRadioGroup: React.FC<StatusRadioGroupProps> = ({
  value,
  onChange,
  disabled = false,
  size = 'medium',
}) => {
  return (
    <FormControl component="fieldset" disabled={disabled}>
      <RadioGroup
        row
        value={value}
        onChange={(e) => onChange(e.target.value as 'active' | 'inactive')}
      >
        <FormControlLabel
          value="active"
          control={<Radio size={size} />}
          label="활성"
        />
        <FormControlLabel
          value="inactive"
          control={<Radio size={size} />}
          label="비활성"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default StatusRadioGroup; 