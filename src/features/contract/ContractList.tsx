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
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Stack,
  LinearProgress,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import SearchPanel from '@/components/common/search/SearchPanel';
import { contractSearchConditions } from '@/components/common/search/searchConditions';
import { format } from 'date-fns';

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

  const getDocumentProgress = (documents: any[]) => {
    const totalDocs = documents.length;
    const completedDocs = documents.filter(d => d.status === '완료').length;
    return (completedDocs / totalDocs) * 100;
  };

  const getDocumentProgressColor = (progress: number) => {
    if (progress === 100) return 'success';
    if (progress >= 50) return 'info';
    return 'warning';
  };

  const getDocumentProgressText = (documents: any[]) => {
    const totalDocs = documents.length;
    const completedDocs = documents.filter(d => d.status === '완료').length;
    return `${completedDocs}/${totalDocs}`;
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
        <Table size="small">
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
              <TableCell>서류</TableCell>
              <TableCell>상태</TableCell>
              <TableCell align="center">관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockContracts.map((contract) => {
              const docProgress = getDocumentProgress(contract.documents);
              return (
                <TableRow 
                  key={contract.id}
                  onClick={() => handleRowClick(contract.id)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                >
                  <TableCell>
                    <Typography variant="body2" noWrap>
                      {contract.contractNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={contract.type}
                      size="small"
                      color={contract.type === '매매' ? 'primary' : 'info'}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap>
                      {contract.property.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {contract.property.address}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap>
                      {contract.customer.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {contract.customer.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {format(new Date(contract.contractDate), 'MM/dd')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {format(new Date(contract.startDate), 'MM/dd')}
                      {contract.endDate && ` ~ ${format(new Date(contract.endDate), 'MM/dd')}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap>
                      {contract.deposit}
                      {contract.monthlyRent && ` + ${contract.monthlyRent}/월`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {contract.commission}
                    </Typography>
                    <Chip
                      label={contract.commissionStatus}
                      color={getCommissionStatusColor(contract.commissionStatus)}
                      size="small"
                      sx={{ height: 20 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={
                      <Box>
                        <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                          서류 진행 현황
                        </Typography>
                        {contract.documents.map((doc, index) => (
                          <Typography key={index} variant="caption" sx={{ display: 'block' }}>
                            {doc.name}: {doc.status}
                          </Typography>
                        ))}
                      </Box>
                    }>
                      <Box sx={{ width: '100%', minWidth: 100 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ mr: 1 }}>
                            {getDocumentProgressText(contract.documents)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {Math.round(docProgress)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={docProgress}
                          color={getDocumentProgressColor(docProgress)}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={contract.status}
                      color={getStatusColor(contract.status)}
                      size="small"
                      sx={{ height: 20 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <Tooltip title="상세보기">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/contracts/${contract.id}`);
                          }}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="수정">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/contracts/${contract.id}/edit`);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="계약서 변경이력">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/contracts/${contract.id}/history`);
                          }}
                        >
                          <HistoryIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
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