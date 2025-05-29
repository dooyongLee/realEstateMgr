import { useState, useEffect } from 'react';
import { Property } from '@/types/property';

export const useProperty = (id?: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProperty(id);
    }
  }, [id]);

  const fetchProperty = async (propertyId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 호출로 변경
      const mockProperty: Property = {
        id: Number(propertyId),
        title: '강남 아파트',
        type: 'APARTMENT',
        status: 'AVAILABLE',
        address: '서울시 강남구 역삼동 123-45',
        latitude: 37.5665,
        longitude: 126.9780,
        price: 120000,
        size: 120,
        maintenanceFee: 30,
        parking: '2대',
        moveInDate: '2024-04-01',
        features: ['NEAR_STATION', 'PARKING', 'ELEVATOR'],
        description: '강남역 5분 거리, 역세권 프리미엄 아파트',
        images: [],
      };
      setProperty(mockProperty);
    } catch (err) {
      setError('매물 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProperty = async (propertyId: string, data: Partial<Property>) => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: API 호출로 변경
      console.log('Update property:', propertyId, data);
      return true;
    } catch (err) {
      setError('매물 수정에 실패했습니다.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    property,
    isLoading,
    error,
    updateProperty,
  };
}; 