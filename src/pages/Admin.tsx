import React from 'react';
import { FaUserShield, FaUsers, FaCog, FaChartPie } from 'react-icons/fa';
import PageLayout from '../components/layout/PageLayout';
import StatsGrid from '../components/stats/StatsGrid';

const Admin: React.FC = () => {
  const stats = [
    {
      title: '전체 관리자',
      value: '5',
      icon: FaUserShield,
      description: '등록된 관리자 수',
      trend: { value: 0, isPositive: true }
    },
    {
      title: '활성 관리자',
      value: '3',
      icon: FaUsers,
      description: '현재 활동중인 관리자',
      trend: { value: 1, isPositive: true }
    },
    {
      title: '설정 변경',
      value: '12',
      icon: FaCog,
      description: '이번 달 설정 변경 횟수',
      trend: { value: 2, isPositive: false }
    },
    {
      title: '관리자 활동지수',
      value: '92',
      icon: FaChartPie,
      description: '이번 달 활동지수',
      trend: { value: 5, isPositive: true }
    }
  ];

  return (
    <PageLayout title="관리자 관리">
      <StatsGrid stats={stats} />
    </PageLayout>
  );
};

export default Admin; 