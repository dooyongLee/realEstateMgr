import React from 'react';
import { FaHome, FaFileContract, FaUsers, FaChartLine } from 'react-icons/fa';
import PageLayout from '../components/layout/PageLayout';
import StatsGrid from '../components/stats/StatsGrid';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: '총 매물 수',
      value: '156',
      icon: FaHome,
      description: '현재 등록된 매물',
      trend: { value: 12, isPositive: true }
    },
    {
      title: '진행중인 계약',
      value: '23',
      icon: FaFileContract,
      description: '이번 달 진행중인 계약',
      trend: { value: 5, isPositive: true }
    },
    {
      title: '신규 고객',
      value: '45',
      icon: FaUsers,
      description: '이번 달 신규 고객',
      trend: { value: 8, isPositive: true }
    },
    {
      title: '월간 매출',
      value: '₩125,000,000',
      icon: FaChartLine,
      description: '이번 달 예상 매출',
      trend: { value: 15, isPositive: true }
    }
  ];

  return (
    <PageLayout title="대시보드">
      <StatsGrid stats={stats} />
    </PageLayout>
  );
};

export default Dashboard; 