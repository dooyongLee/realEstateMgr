import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

declare global {
  interface Window {
    daum: any;
    kakao: any;
  }
}

interface KakaoAddressSearchProps {
  onAddressSelect: (address: string, latitude: number, longitude: number) => void;
  value?: string;
  error?: boolean;
  helperText?: string;
}

const KakaoAddressSearch: React.FC<KakaoAddressSearchProps> = ({
  onAddressSelect,
  value = '',
  error = false,
  helperText,
}) => {
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  useEffect(() => {
    // 다음 주소 API 로드
    const postcodeScript = document.createElement('script');
    postcodeScript.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    postcodeScript.async = true;
    document.head.appendChild(postcodeScript);

    // 카카오맵 API 로드
    const kakaoScript = document.createElement('script');
    kakaoScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c456a11190a7975ad58deff213fae949&libraries=services&autoload=false`;
    kakaoScript.async = true;
    kakaoScript.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setIsKakaoLoaded(true);
        });
      }
    };
    document.head.appendChild(kakaoScript);

    return () => {
      document.head.removeChild(postcodeScript);
      document.head.removeChild(kakaoScript);
    };
  }, []);

  const handleSearch = () => {
    if (!window.daum) {
      console.error('Daum postcode script is not loaded');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        // 주소 선택 시 실행될 콜백 함수
        const address = data.address;
        
        // 카카오맵 API가 로드되었는지 확인
        if (!isKakaoLoaded || !window.kakao || !window.kakao.maps) {
          console.error('Kakao Maps API is not loaded');
          return;
        }

        // 카카오맵 API를 사용하여 주소의 좌표를 가져옴
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (results: any, status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = results[0];
            const latitude = parseFloat(coords.y);
            const longitude = parseFloat(coords.x);
            onAddressSelect(address, latitude, longitude);
          }
        });
      },
      width: '100%',
      height: '100%',
    }).open();
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', width: '100%', height: '60%' }}>
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
        disabled={!isKakaoLoaded}
        sx={{
          width: '15%',
          height: '100%',
        }}
      >
        검색
      </Button>
    </Box>
  );
};

export default KakaoAddressSearch; 