import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface AddressSearchProps {
  value: string;
  onChange: (address: string) => void;
  error?: boolean;
  helperText?: string;
}

const AddressSearch = ({ value, onChange, error, helperText }: AddressSearchProps) => {
  const [detailAddress, setDetailAddress] = useState('');

  const handleSearch = () => {
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

        onChange(fullAddress);
      }
    }).open();
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
    onChange(`${value} ${e.target.value}`);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <TextField
          fullWidth
          value={value}
          error={error}
          helperText={helperText}
          placeholder="주소를 검색하세요"
          InputProps={{
            readOnly: true,
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
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
        sx={{ mt: 1 }}
      />
    </Box>
  );
};

export default AddressSearch; 