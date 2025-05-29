import React, { useEffect, useRef, useState, useCallback } from 'react';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  width?: string;
  height?: string;
}

interface Facility {
  name: string;
  category: string;
  position: {
    lat: number;
    lng: number;
  };
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC<KakaoMapProps> = ({ 
  latitude, 
  longitude, 
  width = '100%', 
  height = '400px' 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);

  const createMarker = useCallback((facility: Facility) => {
    if (!mapInstance.current) return;

    const markerImage = new window.kakao.maps.MarkerImage(
      getMarkerImage(facility.category),
      new window.kakao.maps.Size(32, 32)
    );

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(facility.position.lat, facility.position.lng),
      image: markerImage
    });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:8px;font-size:13px;font-weight:500;color:#333;background:white;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">${facility.name}</div>`
    });

    window.kakao.maps.event.addListener(marker, 'mouseover', () => {
      infowindow.open(mapInstance.current, marker);
    });

    window.kakao.maps.event.addListener(marker, 'mouseout', () => {
      infowindow.close();
    });

    marker.setMap(mapInstance.current);
  }, []);

  const getMarkerImage = (category: string) => {
    const markerImages = {
      subway: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png',
      school: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png',
      bus: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png',
      hospital: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png'
    };

    // SVG 아이콘 생성
    const createSVGMarker = (color: string, icon: string) => {
      const svg = `
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="${color}"/>
          <text x="16" y="22" text-anchor="middle" fill="white" font-size="16" font-family="Arial">${icon}</text>
        </svg>
      `;
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    };

    const markerConfig = {
      subway: {
        color: '#2E7D32', // 초록색
        icon: '🚇'
      },
      school: {
        color: '#1976D2', // 파란색
        icon: '🏫'
      },
      bus: {
        color: '#D32F2F', // 빨간색
        icon: '🚌'
      },
      hospital: {
        color: '#7B1FA2', // 보라색
        icon: '🏥'
      }
    };

    const config = markerConfig[category as keyof typeof markerConfig] || markerConfig.subway;
    return createSVGMarker(config.color, config.icon);
  };

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        initMap();
      } else {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c456a11190a7975ad58deff213fae949&libraries=services&autoload=false`;
        script.async = true;
        script.onerror = (error) => {
          console.error('카카오맵 SDK 로드 실패:', error);
          setError('카카오맵을 불러오는데 실패했습니다. API 키와 도메인 설정을 확인해주세요.');
        };
        script.onload = () => {
          if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
              initMap();
            });
          } else {
            console.error('카카오맵 SDK가 제대로 로드되지 않았습니다.');
            setError('카카오맵 초기화에 실패했습니다.');
          }
        };
        document.head.appendChild(script);
      }
    };

    const searchNearbyFacilities = async () => {
      if (!mapInstance.current) return;

      const places = new window.kakao.maps.services.Places();
      const radius = 1000; // 1km 반경

      const categories = [
        { keyword: '지하철역', category: 'subway' },
        { keyword: '초등학교', category: 'school' },
        { keyword: '중학교', category: 'school' },
        { keyword: '고등학교', category: 'school' },
        { keyword: '버스정류장', category: 'bus' },
        { keyword: '병원', category: 'hospital' }
      ];

      const searchPromises = categories.map(category => {
        return new Promise<Facility[]>((resolve) => {
          places.keywordSearch(
            category.keyword,
            (results: any[], status: string) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const nearbyResults = results.filter(result => {
                  const distance = calculateDistance(
                    latitude,
                    longitude,
                    result.y,
                    result.x
                  );
                  return distance <= radius;
                });

                resolve(
                  nearbyResults.map(result => ({
                    name: result.place_name,
                    category: category.category,
                    position: {
                      lat: parseFloat(result.y),
                      lng: parseFloat(result.x)
                    }
                  }))
                );
              } else {
                resolve([]);
              }
            },
            {
              location: new window.kakao.maps.LatLng(latitude, longitude),
              radius: radius,
              sort: window.kakao.maps.services.SortBy.DISTANCE
            }
          );
        });
      });

      const results = await Promise.all(searchPromises);
      const allFacilities = results.flat();
      setFacilities(allFacilities);
    };

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // 지구의 반경 (km)
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c * 1000; // 미터 단위로 변환
    };

    const initMap = () => {
      if (!mapRef.current) return;

      try {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3
        };

        mapInstance.current = new window.kakao.maps.Map(container, options);

        // 매물 위치 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: new window.kakao.maps.MarkerImage(
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            new window.kakao.maps.Size(32, 35)
          )
        });
        marker.setMap(mapInstance.current);

        // 주변 시설 검색
        searchNearbyFacilities();
        setError(null);
      } catch (err) {
        console.error('지도 초기화 중 오류 발생:', err);
        setError('지도를 표시하는데 실패했습니다.');
      }
    };

    loadKakaoMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current = null;
      }
    };
  }, [latitude, longitude]);

  // 시설 마커 생성
  useEffect(() => {
    if (mapInstance.current && facilities.length > 0) {
      facilities.forEach(createMarker);
    }
  }, [facilities, createMarker]);

  return (
    <div style={{ position: 'relative' }}>
      <div 
        ref={mapRef} 
        style={{ 
          width, 
          height,
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden'
        }} 
      />
      {error && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '1rem',
          borderRadius: '4px',
          textAlign: 'center',
          color: 'red'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default KakaoMap; 