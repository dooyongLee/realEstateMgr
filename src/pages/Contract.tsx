import React from 'react';
import { FaFileContract, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import PageLayout from '../components/layout/PageLayout';
import StatsGrid from '../components/stats/StatsGrid';
import CommonDataGrid from '../components/data-display/CommonDataGrid';
import SearchPanel from '../components/search/SearchPanel';
import StatusBadge from '../components/data-display/StatusBadge';

const Contract: React.FC = () => {
  const stats = [
    {
      title: '이번 달 계약',
      value: '45',
      icon: FaFileContract,
      description: '신규 계약 건수',
      trend: { value: 15, isPositive: true }
    },
    {
      title: '이번 달 수수료',
      value: '1.2억',
      icon: FaCheckCircle,
      description: '예상 수수료',
      trend: { value: 8, isPositive: true }
    },
    {
      title: '미수금',
      value: '3,500만',
      icon: FaClock,
      description: '미수 수수료',
      trend: { value: 5, isPositive: false }
    },
    {
      title: '계약 만료',
      value: '5',
      icon: FaExclamationTriangle,
      description: '30일 이내 만료 계약',
      trend: { value: 2, isPositive: false }
    }
  ];

  const searchFields = [
    {
      name: 'type',
      label: '계약 유형',
      type: 'select' as const,
      options: [
        { value: 'sale', label: '매매' },
        { value: 'rent', label: '임대' },
        { value: 'jeonse', label: '전세' }
      ],
      tooltip: '계약의 유형을 선택하세요'
    },
    {
      name: 'status',
      label: '상태',
      type: 'select' as const,
      options: [
        { value: 'in_progress', label: '진행중' },
        { value: 'completed', label: '완료' },
        { value: 'expired', label: '만료' }
      ],
      tooltip: '계약의 현재 상태를 선택하세요'
    },
    {
      name: 'searchType',
      label: '검색 유형',
      type: 'select' as const,
      options: [
        { value: 'client', label: '계약자' },
        { value: 'property', label: '매물' }
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
      headerName: '계약 유형', 
      width: 130
    },
    { 
      field: 'propertyType', 
      headerName: '매물 종류', 
      width: 130
    },
    { 
      field: 'status', 
      headerName: '상태', 
      width: 130,
      renderCell: (params) => (
        <StatusBadge 
          status={params.value} 
          variant={
            params.value === '계약서 작성' ? 'warning' :
            params.value === '계약금 입금' ? 'info' :
            params.value === '계약 완료' ? 'success' : 'default'
          }
        />
      )
    },
    { 
      field: 'property', 
      headerName: '매물', 
      width: 200
    },
    { 
      field: 'price', 
      headerName: '계약금액', 
      width: 130
    },
    { 
      field: 'commission', 
      headerName: '수수료', 
      width: 130
    },
    { 
      field: 'commissionStatus', 
      headerName: '수수료 상태', 
      width: 100,
      renderCell: (params) => (
        <StatusBadge 
          status={params.value} 
          variant={
            params.value === '미수금' ? 'error' :
            params.value === '부분수금' ? 'warning' :
            params.value === '완납' ? 'success' : 'default'
          }
        />
      )
    },
    { 
      field: 'documentStatus', 
      headerName: '서류 상태', 
      width: 100,
      renderCell: (params) => (
        <StatusBadge 
          status={params.value} 
          variant={
            params.value === '작성중' ? 'warning' :
            params.value === '서명완료' ? 'info' :
            params.value === '등기완료' ? 'success' : 'default'
          }
        />
      )
    },
    { 
      field: 'startDate', 
      headerName: '시작일', 
      width: 120
    },
    { 
      field: 'endDate', 
      headerName: '종료일', 
      width: 120
    },
    { 
      field: 'registeredDate', 
      headerName: '등록일', 
      width: 120
    }
  ];

  const rows = [
    { 
      id: 1, 
      type: '매매', 
      propertyType: '아파트',
      status: '계약서 작성',
      property: '서울시 강남구 아파트', 
      price: 500000000,
      commission: 15000000,
      commissionStatus: '미수금',
      documentStatus: '작성중',
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      registeredDate: '2024-03-15'
    },
    { 
      id: 2, 
      type: '전세', 
      propertyType: '주택',
      status: '계약금 입금',
      property: '서울시 서초구 주택', 
      price: 300000000,
      commission: 9000000,
      commissionStatus: '부분수금',
      documentStatus: '서명완료',
      startDate: '2024-03-14',
      endDate: '2025-03-14',
      registeredDate: '2024-03-14'
    },
    { 
      id: 3, 
      type: '월세', 
      propertyType: '상가',
      status: '계약 완료',
      property: '서울시 송파구 상가', 
      price: 100000000,
      commission: 3000000,
      commissionStatus: '완납',
      documentStatus: '등기완료',
      startDate: '2024-03-13',
      endDate: '2025-03-13',
      registeredDate: '2024-03-13'
    }
  ];

  const handleSearch = (values: Record<string, string>) => {
    console.log('Search values:', values);
    // TODO: Implement search logic
  };

  const handleAdd = () => {
    // TODO: Implement add contract logic
    console.log('Add new contract');
  };

  const handleDelete = (ids: GridRowSelectionModel) => {
    // TODO: Implement delete contracts logic
    console.log('Delete contracts:', ids);
  };

  return (
    <PageLayout title="계약 관리">
      <StatsGrid stats={stats} />
      <SearchPanel fields={searchFields} onSearch={handleSearch} />
      <CommonDataGrid 
        rows={rows} 
        columns={columns} 
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    </PageLayout>
  );
};

export default Contract; 