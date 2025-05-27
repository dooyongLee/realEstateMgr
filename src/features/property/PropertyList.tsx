import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SearchPanel from '@/components/common/grid/SearchPanel';

// Mock data for development
const mockProperties = [
  {
    id: 1,
    title: '강남 아파트',
    type: '아파트',
    price: '12억',
    size: '120평',
    status: '판매중',
    location: '서울시 강남구',
    createdAt: '2024-03-15',
  },
  {
    id: 2,
    title: '송파 오피스텔',
    type: '오피스텔',
    price: '8억',
    size: '80평',
    status: '계약중',
    location: '서울시 송파구',
    createdAt: '2024-03-14',
  },
];

const PropertyList = () => {
  const navigate = useNavigate();

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

  const handleSearch = (value: string) => {
    console.log('Search:', value);
  };

  const handleRowClick = (id: number) => {
    navigate(`/properties/${id}`);
  };

  return (
    <Card sx={{ mt: 3 }}>
      <SearchPanel
        title="매물"
        onAdd={() => console.log('Add property')}
        onSearch={handleSearch}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell>유형</TableCell>
              <TableCell>가격</TableCell>
              <TableCell>면적</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>위치</TableCell>
              <TableCell>등록일</TableCell>
              <TableCell>관리</TableCell>
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
                <TableCell>{property.size}</TableCell>
                <TableCell>
                  <Chip
                    label={property.status}
                    color={getStatusColor(property.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{property.location}</TableCell>
                <TableCell>{property.createdAt}</TableCell>
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
    </Card>
  );
};

export default PropertyList; 