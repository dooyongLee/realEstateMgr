import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface AddressInputProps {
  value: string;
  onChange: (address: string, detailAddress: string) => void;
  error?: boolean;
  helperText?: string;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (config: any) => any;
    };
  }
}

const AddressInput = ({ value, onChange, error, helperText }: AddressInputProps) => {
  const [detailAddress, setDetailAddress] = useState('');

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          if (extraAddress !== '') {
            fullAddress += ` (${extraAddress})`;
          }
        }

        onChange(fullAddress, detailAddress);
      },
    }).open();
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDetailAddress = e.target.value;
    setDetailAddress(newDetailAddress);
    onChange(value, newDetailAddress);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          value={value}
          placeholder="주소를 검색하세요"
          error={error}
          helperText={helperText}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleAddressSearch}
          sx={{ minWidth: '120px' }}
        >
          주소 검색
        </Button>
      </Box>
      <TextField
        fullWidth
        value={detailAddress}
        onChange={handleDetailAddressChange}
        placeholder="상세주소를 입력하세요"
        size="small"
      />
    </Box>
  );
};

export default AddressInput; 