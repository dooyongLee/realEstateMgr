import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, TablePagination } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchPanel from '@/components/common/search/SearchPanel';
import { propertySearchConditions } from '@/components/common/search/searchConditions';

// Mock data for development
const mockProperties = [
  {
    id: 1,
    title: '강남 아파트',
    type: '아파트',
    price: '12억',
    deposit: '5억',
    monthlyRent: '200만원',
    size: '120평',
    rooms: '4',
    bathrooms: '2',
    floor: '15/25',
    status: '판매중',
    location: '서울시 강남구',
    address: '서울시 강남구 역삼동 123-45',
    direction: '남향',
    parking: '2대',
    maintenanceFee: '30만원',
    availableDate: '2024-04-01',
    createdAt: '2024-03-15',
    lastModified: '2024-03-20',
    viewCount: 156,
    interestCount: 23,
    agent: '김부동',
    contact: '010-1234-5678',
    description: '강남역 5분 거리, 역세권 프리미엄 아파트',
    features: ['주차장', 'CCTV', '엘리베이터', '보안시스템'],
  },
  {
    id: 2,
    title: '송파 오피스텔',
    type: '오피스텔',
    price: '8억',
    deposit: '3억',
    monthlyRent: '150만원',
    size: '80평',
    rooms: '3',
    bathrooms: '1',
    floor: '8/15',
    status: '계약중',
    location: '서울시 송파구',
    address: '서울시 송파구 잠실동 456-78',
    direction: '동향',
    parking: '1대',
    maintenanceFee: '20만원',
    availableDate: '2024-03-25',
    createdAt: '2024-03-14',
    lastModified: '2024-03-19',
    viewCount: 98,
    interestCount: 15,
    agent: '이부동',
    contact: '010-2345-6789',
    description: '잠실역 3분 거리, 신축 오피스텔',
    features: ['주차장', 'CCTV', '엘리베이터', '보안시스템', '헬스장'],
  },
];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case '판매중':
        return 'primary';
      case '계약중':
        return 'warning';
      case '판매완료':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleRowClick = (id: number) => {
    navigate(`/properties/${id}`);
  };

  const handleAdd = () => {
    navigate('/properties/new');
  };

  return (
    <Card sx={{ mt: 3 }}>
      <SearchPanel
        conditions={propertySearchConditions}
        placeholder="매물명, 주소로 검색"
        onAdd={handleAdd}
        onSearch={(conditions) => {
          console.log(JSON.stringify(conditions));
        }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>매물명</TableCell>
              <TableCell>유형</TableCell>
              <TableCell>가격</TableCell>
              <TableCell>보증금/월세</TableCell>
              <TableCell>면적</TableCell>
              <TableCell>방/욕실</TableCell>
              <TableCell>층수</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>주소</TableCell>
              <TableCell>주차</TableCell>
              <TableCell>관리비</TableCell>
              <TableCell>입주가능일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockProperties.map((property) => (
              <TableRow 
                key={property.id}
                onClick={() => handleRowClick(property.id)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <TableCell>{property.title}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>{property.price}</TableCell>
                <TableCell>
                  {property.deposit}<br/>
                  {property.monthlyRent}
                </TableCell>
                <TableCell>{property.size}</TableCell>
                <TableCell>
                  {property.rooms} / {property.bathrooms}
                </TableCell>
                <TableCell>{property.floor}</TableCell>
                <TableCell>
                  <Chip
                    label={property.status}
                    color={getStatusColor(property.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{property.location}</TableCell>
                <TableCell>{property.parking}</TableCell>
                <TableCell>{property.maintenanceFee}</TableCell>
                <TableCell>{property.availableDate}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Edit:', property.id);
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
                      console.log('Delete:', property.id);
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
        count={mockProperties.length}
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