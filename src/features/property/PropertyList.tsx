import { useState } from 'react';
import { Box, Button, Card, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Stack, LinearProgress, Tooltip, TablePagination } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon, History as HistoryIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { properties } from '../../mocks/properties';
import { format } from 'date-fns';
import SearchPanel from '@/components/common/search/SearchPanel';
import { propertySearchConditions } from '@/components/common/search/searchConditions';

const PropertyList = () => {
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
    navigate(`/properties/${id}`);
  };

  return (
    <Card sx={{ mt: 3 }}>
      <SearchPanel
        conditions={propertySearchConditions}
        placeholder="매물명, 주소, 유형으로 검색"
        onAdd={() => navigate('/properties/new')}
        onSearch={(conditions) => {
          console.log(JSON.stringify(conditions));
        }}
      />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>매물번호</TableCell>
              <TableCell>매물유형</TableCell>
              <TableCell>매물정보</TableCell>
              <TableCell>담당자</TableCell>
              <TableCell>등록일</TableCell>
              <TableCell>입주가능일</TableCell>
              <TableCell>가격</TableCell>
              <TableCell>특징</TableCell>
              <TableCell>조회/관심</TableCell>
              <TableCell>상태</TableCell>
              <TableCell align="center">관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((property) => (
                <TableRow 
                  key={property.id}
                  onClick={() => handleRowClick(property.id)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                >
                  <TableCell>
                    <Typography variant="body2" noWrap>
                      {`PR-${String(property.id).padStart(6, '0')}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={property.type}
                      size="small"
                      color={property.type === '아파트' ? 'primary' : 'info'}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap>
                      {property.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {property.address}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap>
                      {property.agent}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {property.contact}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {format(new Date(property.registeredAt), 'MM/dd')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {format(new Date(property.availableDate), 'MM/dd')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {property.price.toLocaleString()}원
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {property.features.slice(0, 3).map((feature, index) => (
                        <Chip
                          key={index}
                          label={feature}
                          size="small"
                          sx={{ height: 20, fontSize: '0.75rem' }}
                        />
                      ))}
                      {property.features.length > 3 && (
                        <Chip
                          label={`+${property.features.length - 3}`}
                          size="small"
                          sx={{ height: 20, fontSize: '0.75rem' }}
                        />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {property.viewCount}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {property.interestCount} 관심
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={property.status}
                      size="small"
                      color={
                        property.status === '임대중'
                          ? 'success'
                          : property.status === '계약대기'
                          ? 'warning'
                          : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="상세보기">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(property.id);
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
                          navigate(`/properties/${property.id}/edit`);
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
                          navigate(`/properties/${property.id}/history`);
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
        count={properties.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default PropertyList; 