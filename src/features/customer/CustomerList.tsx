import { useState } from 'react';
import { Box, Button, Card, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Stack, Tooltip, TablePagination } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon, History as HistoryIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { customers } from '../../mocks/customers';
import { format } from 'date-fns';
import SearchPanel from '@/components/common/search/SearchPanel';
import { customerSearchConditions } from '@/components/common/search/searchConditions';

const CustomerList = () => {
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

  const handleRowClick = (id: number) => {
    navigate(`/customers/${id}`);
  };

  return (
    <Card sx={{ mt: 3 }}>
      <SearchPanel
        conditions={customerSearchConditions}
        placeholder="고객명, 연락처, 이메일로 검색"
        onAdd={() => navigate('/customers/new')}
        onSearch={(conditions) => {
          console.log(JSON.stringify(conditions));
        }}
      />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>고객번호</TableCell>
              <TableCell>고객유형</TableCell>
              <TableCell>고객정보</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>계약현황</TableCell>
              <TableCell>서류현황</TableCell>
              <TableCell>등록일</TableCell>
              <TableCell>상태</TableCell>
              <TableCell align="center">관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => (
                <TableRow 
                  key={customer.id}
                  onClick={() => handleRowClick(customer.id)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                >
                  <TableCell>
                    <Typography variant="body2" noWrap>
                      {customer.customerNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={customer.type}
                      size="small"
                      color={
                        customer.type === '매수자' ? 'primary' :
                        customer.type === '매도자' ? 'secondary' :
                        customer.type === '임차인' ? 'info' : 'success'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap>
                      {customer.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {customer.address}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap>
                      {customer.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap>
                      {customer.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      {customer.contracts.map((contract) => (
                        <Chip
                          key={contract.id}
                          label={`${contract.type} ${contract.status}`}
                          size="small"
                          color={
                            contract.status === '완료' ? 'success' :
                            contract.status === '진행중' ? 'warning' : 'error'
                          }
                          sx={{ height: 20, fontSize: '0.75rem' }}
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      {customer.documents.map((doc, index) => (
                        <Chip
                          key={index}
                          label={doc.name}
                          size="small"
                          color={doc.status === '완료' ? 'success' : 'warning'}
                          sx={{ height: 20, fontSize: '0.75rem' }}
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {format(new Date(customer.createdAt), 'MM/dd')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={customer.status}
                      size="small"
                      color={
                        customer.status === '활성'
                          ? 'success'
                          : customer.status === '비활성'
                          ? 'warning'
                          : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="상세보기">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(customer.id);
                        }}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="수정">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/customers/${customer.id}/edit`);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="이력">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/customers/${customer.id}/history`);
                        }}
                      >
                        <HistoryIcon />
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
        count={customers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default CustomerList; 