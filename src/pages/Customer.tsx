import React from 'react';
import { FaUsers, FaUserPlus, FaUserCheck, FaUserClock } from 'react-icons/fa';
import { GridColDef } from '@mui/x-data-grid';
import PageLayout from '../components/layout/PageLayout';
import StatsGrid from '../components/stats/StatsGrid';
import CommonDataGrid from '../components/data-display/CommonDataGrid';
import SearchPanel from '../components/search/SearchPanel';
import StatusBadge from '../components/data-display/StatusBadge';

const Customer: React.FC = () => {
  const stats = [
    {
      title: '전체 고객',
      value: '234',
      icon: FaUsers,
      description: '등록된 전체 고객',
      trend: { value: 18, isPositive: true }
    },
    {
      title: '신규 고객',
      value: '45',
      icon: FaUserPlus,
      description: '이번 달 신규 고객',
      trend: { value: 12, isPositive: true }
    },
    {
      title: '활성 고객',
      value: '178',
      icon: FaUserCheck,
      description: '최근 3개월 활동 고객',
      trend: { value: 8, isPositive: true }
    },
    {
      title: '잠재 고객',
      value: '56',
      icon: FaUserClock,
      description: '상담 진행중인 고객',
      trend: { value: 5, isPositive: true }
    }
  ];

  const searchFields = [
    {
      name: 'type',
      label: '고객 유형',
      type: 'select' as const,
      options: [
        { value: 'buyer', label: '매수자' },
        { value: 'seller', label: '매도자' },
        { value: 'tenant', label: '임차인' },
        { value: 'landlord', label: '임대인' }
      ],
      tooltip: '고객의 거래 유형을 선택하세요'
    },
    {
      name: 'status',
      label: '상태',
      type: 'select' as const,
      options: [
        { value: 'active', label: '활성' },
        { value: 'inactive', label: '비활성' }
      ],
      tooltip: '고객의 현재 상태를 선택하세요'
    },
    {
      name: 'searchType',
      label: '검색 유형',
      type: 'select' as const,
      options: [
        { value: 'name', label: '고객명' },
        { value: 'phone', label: '연락처' }
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
    { field: 'id', headerName: '고객번호', width: 90 },
    { field: 'name', headerName: '고객명', width: 130 },
    { field: 'phone', headerName: '연락처', width: 130 },
    { field: 'email', headerName: '이메일', width: 200 },
    { field: 'type', headerName: '고객 유형', width: 130 },
    { field: 'lastContact', headerName: '최근 연락일', width: 130 },
    { 
      field: 'status', 
      headerName: '상태', 
      width: 130,
      renderCell: (params) => (
        <StatusBadge 
          status={params.value} 
          variant={params.value === '활성' ? 'success' : 'default'}
        />
      )
    },
    { field: 'registeredDate', headerName: '등록일', width: 130 }
  ];

  const rows = [
    { 
      id: 1, 
      name: '김철수', 
      phone: '010-1234-5678', 
      email: 'kim@example.com', 
      type: '매수희망', 
      lastContact: '2024-03-15', 
      status: '활성', 
      registeredDate: '2024-02-01' 
    },
    { 
      id: 2, 
      name: '이영희', 
      phone: '010-2345-6789', 
      email: 'lee@example.com', 
      type: '매도희망', 
      lastContact: '2024-03-14', 
      status: '활성', 
      registeredDate: '2024-01-15' 
    },
    { 
      id: 3, 
      name: '박지민', 
      phone: '010-3456-7890', 
      email: 'park@example.com', 
      type: '임대희망', 
      lastContact: '2024-03-10', 
      status: '비활성', 
      registeredDate: '2024-03-01' 
    }
  ];

  const handleSearch = (values: Record<string, string>) => {
    console.log('Search values:', values);
    // TODO: Implement search logic
  };

  const handleAdd = () => {
    // TODO: Implement add customer logic
    console.log('Add new customer');
  };

  return (
    <PageLayout title="고객 관리">
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

export default Customer; 