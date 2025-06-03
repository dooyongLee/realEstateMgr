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
import { contracts } from '../../mocks/contracts';

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

  const handleRowClick = (id: number) => {
    navigate(`/contracts/${id}`);
  };

  const getDocumentProgress = (documents: Array<{ status: string }>) => {
    const total = documents.length;
    const completed = documents.filter(doc => doc.status === '완료').length;
    return (completed / total) * 100;
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
            {contracts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((contract) => {
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
                      <Typography variant="body2">
                        {contract.deposit}
                        {contract.monthlyRent && ` / ${contract.monthlyRent}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {contract.commission}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {contract.commissionStatus}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1}>
                        <LinearProgress 
                          variant="determinate" 
                          value={docProgress} 
                          sx={{ height: 4, borderRadius: 2 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {contract.documents.filter(doc => doc.status === '완료').length} / {contract.documents.length}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={contract.status}
                        size="small"
                        color={
                          contract.status === '완료'
                            ? 'success'
                            : contract.status === '진행중'
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
                            handleRowClick(contract.id);
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
                            navigate(`/contracts/${contract.id}/edit`);
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
                            navigate(`/contracts/${contract.id}/history`);
                          }}
                        >
                          <HistoryIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={contracts.length}
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