import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Description as DocumentIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import SearchPanel from '@/components/common/search/SearchPanel';
import { contractSearchConditions } from '@/components/common/search/searchConditions';

// Mock data for development
const mockContracts = [
  {
    id: 1,
    contractNumber: 'CT-2024-001',
    type: '매매',
    property: {
      id: 1,
      title: '강남 아파트',
      type: '아파트',
      address: '서울시 강남구 역삼동 123-45',
      size: '120평',
      price: '12억',
    },
    customer: {
      id: 1,
      name: '홍길동',
      type: '매수자',
      phone: '010-1234-5678',
      email: 'hong@example.com',
    },
    status: '진행중',
    contractDate: '2024-03-15',
    startDate: '2024-04-01',
    endDate: null,
    deposit: '5억',
    monthlyRent: null,
    commission: '1200만원',
    commissionStatus: '미지급',
    paymentSchedule: [
      { date: '2024-03-20', amount: '4억', type: '계약금' },
      { date: '2024-04-01', amount: '8억', type: '잔금' },
    ],
    documents: [
      { name: '매매계약서', status: '완료' },
      { name: '소유권이전등기', status: '진행중' },
    ],
    agent: '김부동',
    notes: '계약금 입금 예정',
    createdAt: '2024-03-15',
    lastModified: '2024-03-20',
  },
  {
    id: 2,
    contractNumber: 'CT-2024-002',
    type: '임대',
    property: {
      id: 2,
      title: '송파 오피스텔',
      type: '오피스텔',
      address: '서울시 송파구 잠실동 456-78',
      size: '80평',
      price: '8억',
    },
    customer: {
      id: 2,
      name: '김철수',
      type: '임차인',
      phone: '010-2345-6789',
      email: 'kim@example.com',
    },
    status: '완료',
    contractDate: '2024-03-10',
    startDate: '2024-03-25',
    endDate: '2025-03-24',
    deposit: '3억',
    monthlyRent: '150만원',
    commission: '800만원',
    commissionStatus: '지급완료',
    paymentSchedule: [
      { date: '2024-03-10', amount: '3억', type: '보증금' },
      { date: '2024-03-25', amount: '150만원', type: '월세' },
    ],
    documents: [
      { name: '임대차계약서', status: '완료' },
      { name: '전입신고', status: '완료' },
    ],
    agent: '이부동',
    notes: '월세 자동이체 설정 완료',
    createdAt: '2024-03-10',
    lastModified: '2024-03-25',
  },
];

const ContractList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '진행중':
        return 'warning';
      case '완료':
        return 'success';
      case '취소':
        return 'error';
      default:
        return 'default';
    }
  };

  const getCommissionStatusColor = (status: string) => {
    switch (status) {
      case '지급완료':
        return 'success';
      case '부분지급':
        return 'warning';
      case '미지급':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleRowClick = (id: number) => {
    navigate(`/contracts/${id}`);
  };

  return (
    <Card sx={{ mt: 3 }}>
      <SearchPanel
        conditions={contractSearchConditions}
        placeholder="계약번호, 고객명, 매물명으로 검색"
        onAdd={() => navigate('/contracts/new')}
        onSearch={(conditions) => {
          console.log(JSON.stringify(conditions));
        }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>계약번호</TableCell>
              <TableCell>계약종류</TableCell>
              <TableCell>매물정보</TableCell>
              <TableCell>고객정보</TableCell>
              <TableCell>계약일</TableCell>
              <TableCell>계약기간</TableCell>
              <TableCell>보증금/월세</TableCell>
              <TableCell>수수료</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockContracts.map((contract) => (
              <TableRow 
                key={contract.id}
                onClick={() => handleRowClick(contract.id)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <TableCell>{contract.contractNumber}</TableCell>
                <TableCell>{contract.type}</TableCell>
                <TableCell>
                  {contract.property.title}<br/>
                  <small>{contract.property.address}</small>
                </TableCell>
                <TableCell>
                  {contract.customer.name}<br/>
                  <small>{contract.customer.phone}</small>
                </TableCell>
                <TableCell>{contract.contractDate}</TableCell>
                <TableCell>
                  {contract.startDate}<br/>
                  {contract.endDate ? `~ ${contract.endDate}` : ''}
                </TableCell>
                <TableCell>
                  {contract.deposit}<br/>
                  {contract.monthlyRent && `${contract.monthlyRent}/월`}
                </TableCell>
                <TableCell>
                  {contract.commission}<br/>
                  <Chip
                    label={contract.commissionStatus}
                    color={getCommissionStatusColor(contract.commissionStatus)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={contract.status}
                    color={getStatusColor(contract.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="계약서">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('View document:', contract.id);
                      }}
                    >
                      <DocumentIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="수수료 관리">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Manage commission:', contract.id);
                      }}
                    >
                      <PaymentIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={mockContracts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default ContractList; 