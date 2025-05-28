import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SearchPanel from '@/components/common/search/SearchPanel';
import { contractSearchConditions } from '@/components/common/search/searchConditions';

// Mock data for development
const mockContracts = [
  {
    id: 1,
    propertyTitle: '강남 아파트',
    tenantName: '홍길동',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    deposit: '5000만원',
    monthlyRent: '200만원',
    status: '진행중',
    createdAt: '2024-02-15',
  },
  {
    id: 2,
    propertyTitle: '송파 오피스텔',
    tenantName: '김철수',
    startDate: '2024-04-01',
    endDate: '2025-03-31',
    deposit: '3000만원',
    monthlyRent: '150만원',
    status: '대기중',
    createdAt: '2024-03-14',
  },
];

const ContractList = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case '진행중':
        return 'primary';
      case '대기중':
        return 'warning';
      case '완료':
        return 'success';
      case '취소':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleSearch = (value: string) => {
    console.log('Search:', value);
  };

  const handleRowClick = (id: number) => {
    navigate(`/contracts/${id}`);
  };

  return (
    <Card sx={{ mt: 3 }}>
      <SearchPanel
        conditions={contractSearchConditions}
        placeholder="계약번호, 고객명으로 검색"
        onAdd={() => console.log('Add contract')}
        onSearch={(value, conditions) => {
          // 검색 로직 구현
        }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>매물</TableCell>
              <TableCell>임차인</TableCell>
              <TableCell>시작일</TableCell>
              <TableCell>종료일</TableCell>
              <TableCell>보증금</TableCell>
              <TableCell>월세</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>등록일</TableCell>
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
                <TableCell>{contract.propertyTitle}</TableCell>
                <TableCell>{contract.tenantName}</TableCell>
                <TableCell>{contract.startDate}</TableCell>
                <TableCell>{contract.endDate}</TableCell>
                <TableCell>{contract.deposit}</TableCell>
                <TableCell>{contract.monthlyRent}</TableCell>
                <TableCell>
                  <Chip
                    label={contract.status}
                    color={getStatusColor(contract.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{contract.createdAt}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Edit:', contract.id);
                    }}
                  >
                    수정
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Delete:', contract.id);
                    }}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ContractList; 