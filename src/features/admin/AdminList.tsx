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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import SearchPanel from '@/components/common/grid/SearchPanel';

// 임시 목업 데이터
const mockCustomers = [
  {
    id: 1,
    name: '홍길동',
    type: '매수희망',
    phone: '010-1234-5678',
    email: 'hong@example.com',
    status: '활성',
    lastContact: '2024-02-15',
  },
  {
    id: 2,
    name: '김철수',
    type: '매도희망',
    phone: '010-2345-6789',
    email: 'kim@example.com',
    status: '활성',
    lastContact: '2024-02-14',
  },
  {
    id: 3,
    name: '이영희',
    type: '임대희망',
    phone: '010-3456-7890',
    email: 'lee@example.com',
    status: '비활성',
    lastContact: '2024-02-10',
  },
];

const AdminList = () => {
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

  const handleSearch = (value: string) => {
    console.log('Search:', value);
  };

  const handleRowClick = (id: number) => {
    navigate(`/customers/${id}`);
  };

  return (
    <Card sx={{ mt: 3 }}>
      <SearchPanel
        title="고객"
        onAdd={() => console.log('Add customer')}
        onSearch={handleSearch}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>고객명</TableCell>
              <TableCell>유형</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>최근 연락일</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockCustomers.map((customer) => (
              <TableRow 
                key={customer.id}
                onClick={() => handleRowClick(customer.id)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.type}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Chip
                    label={customer.status}
                    color={customer.status === '활성' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{customer.lastContact}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Edit:', customer.id);
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
                      console.log('Delete:', customer.id);
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
      <TablePagination
        component="div"
        count={mockCustomers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default AdminList; 