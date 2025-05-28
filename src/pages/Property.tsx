import React from 'react';
import { FaHome, FaBuilding, FaHouseUser, FaChartBar } from 'react-icons/fa';
import { GridColDef } from '@mui/x-data-grid';
import PageLayout from '../components/layout/PageLayout';
import StatsGrid from '../components/stats/StatsGrid';
import CommonDataGrid from '../components/data-display/CommonDataGrid';
import SearchPanel from '../components/search/SearchPanel';
import StatusBadge from '../components/data-display/StatusBadge';

const Property: React.FC = () => {
  const stats = [
    {
      title: '전체 매물',
      value: '156',
      icon: FaHome,
      description: '등록된 전체 매물',
      trend: { value: 12, isPositive: true }
    },
    {
      title: '아파트',
      value: '89',
      icon: FaBuilding,
      description: '아파트 매물 수',
      trend: { value: 8, isPositive: true }
    },
    {
      title: '주택',
      value: '45',
      icon: FaHouseUser,
      description: '주택 매물 수',
      trend: { value: 3, isPositive: true }
    },
    {
      title: '상가',
      value: '22',
      icon: FaChartBar,
      description: '상가 매물 수',
      trend: { value: 1, isPositive: false }
    }
  ];

  const searchFields = [
    {
      name: 'type',
      label: '매물 유형',
      type: 'select' as const,
      options: [
        { value: 'apartment', label: '아파트' },
        { value: 'house', label: '주택' },
        { value: 'commercial', label: '상가' },
        { value: 'office', label: '사무실' }
      ],
      tooltip: '매물의 유형을 선택하세요'
    },
    {
      name: 'status',
      label: '상태',
      type: 'select' as const,
      options: [
        { value: 'available', label: '거래가능' },
        { value: 'reserved', label: '예약중' },
        { value: 'sold', label: '거래완료' }
      ],
      tooltip: '매물의 현재 상태를 선택하세요'
    },
    {
      name: 'searchType',
      label: '검색 유형',
      type: 'select' as const,
      options: [
        { value: 'address', label: '주소' },
        { value: 'price', label: '가격' }
      ],
      tooltip: '검색할 항목을 선택하세요'
    },
    {
      name: 'keyword',
      label: '검색어',
      type: 'text' as const,
      tooltip: '검색어를 입력하세요 (Enter 키로 검색)'
    }
  ];

  const columns: GridColDef[] = [
    { 
      field: 'type', 
      headerName: '매물 종류', 
      width: 130
    },
    { 
      field: 'address', 
      headerName: '주소', 
      width: 200
    },
    { 
      field: 'price', 
      headerName: '가격', 
      width: 130
    },
    { 
      field: 'pricePerPyeong', 
      headerName: '평당가', 
      width: 100
    },
    { 
      field: 'area', 
      headerName: '면적(㎡)', 
      width: 100
    },
    { 
      field: 'areaPyeong', 
      headerName: '면적(평)', 
      width: 100
    },
    { 
      field: 'floor', 
      headerName: '층수', 
      width: 80
    },
    { 
      field: 'rooms', 
      headerName: '방', 
      width: 80
    },
    { 
      field: 'bathrooms', 
      headerName: '화장실', 
      width: 80
    },
    { 
      field: 'status', 
      headerName: '상태', 
      width: 100,
      renderCell: (params) => (
        <StatusBadge 
          status={params.value} 
          variant={
            params.value === '거래가능' ? 'success' :
            params.value === '계약중' ? 'warning' :
            params.value === '거래완료' ? 'info' : 'default'
          }
        />
      )
    }
  ];

  const rows = [
    { 
      id: 1, 
      type: '아파트', 
      address: '서울시 강남구', 
      price: '12억', 
      priceType: 'sale',
      pricePerPyeong: 4687,
      area: '84.5', 
      areaPyeong: '25.6',
      floor: '5',
      rooms: '3', 
      bathrooms: '2',
      status: '거래가능'
    },
    { 
      id: 2, 
      type: '주택', 
      address: '서울시 서초구', 
      price: '8억', 
      priceType: 'sale',
      pricePerPyeong: 2198,
      area: '120.3', 
      areaPyeong: '36.4',
      floor: '2',
      rooms: '4', 
      bathrooms: '2',
      status: '계약중'
    },
    { 
      id: 3, 
      type: '상가', 
      address: '서울시 송파구', 
      price: '15억', 
      priceType: 'sale',
      pricePerPyeong: 3304,
      area: '150.0', 
      areaPyeong: '45.4',
      floor: '1',
      rooms: '2', 
      bathrooms: '1',
      status: '거래완료'
    }
  ];

  const handleSearch = (values: Record<string, string>) => {
    console.log('Search values:', values);
    // TODO: Implement search logic
  };

  const handleAdd = () => {
    // TODO: Implement add property logic
    console.log('Add new property');
  };

  return (
    <PageLayout title="매물 관리">
      <StatsGrid stats={stats} />
      <SearchPanel fields={searchFields} onSearch={handleSearch} />
      <CommonDataGrid 
        rows={rows} 
        columns={columns} 
        onAdd={handleAdd}
      />
    </PageLayout>
  );
};

export default Property; 