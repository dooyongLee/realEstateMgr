import { useState } from 'react';
import { Box, Chip, IconButton, Tooltip, TableCell } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import DataTable, { Column } from '@/components/common/table/DataTable';
import SearchPanel from '@/components/common/search/SearchPanel';

// 임시 목업 데이터
const mockNotices = [
  {
    id: 1,
    title: '시스템 점검 안내',
    content: '2024년 3월 20일 02:00 ~ 04:00 동안 시스템 점검이 진행됩니다.',
    type: '공지',
    status: '진행중',
    author: '관리자',
    createdAt: '2024-03-15',
    viewCount: 150,
  },
  {
    id: 2,
    title: '신규 기능 업데이트 안내',
    content: '계약서 자동 생성 기능이 추가되었습니다.',
    type: '업데이트',
    status: '완료',
    author: '시스템',
    createdAt: '2024-03-14',
    viewCount: 89,
  },
  {
    id: 3,
    title: '이용약관 개정 안내',
    content: '2024년 4월 1일부터 개정된 이용약관이 적용됩니다.',
    type: '안내',
    status: '예정',
    author: '관리자',
    createdAt: '2024-03-13',
    viewCount: 234,
  },
];

const columns: Column[] = [
  { id: 'title', label: '제목' },
  { id: 'type', label: '유형', width: 100 },
  { id: 'status', label: '상태', width: 100 },
  { id: 'author', label: '작성자', width: 100 },
  { id: 'createdAt', label: '작성일', width: 120 },
  { id: 'viewCount', label: '조회수', width: 100, align: 'right' },
  { id: 'actions', label: '관리', width: 150, align: 'right' },
];

const NoticeList = () => {
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

  const handleAdd = () => {
    console.log('Add new notice');
  };

  const handleEdit = (id: number) => {
    console.log('Edit notice:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete notice:', id);
  };

  const handleView = (id: number) => {
    console.log('View notice:', id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '진행중':
        return 'warning';
      case '완료':
        return 'success';
      case '예정':
        return 'info';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '공지':
        return 'error';
      case '업데이트':
        return 'primary';
      case '안내':
        return 'success';
      default:
        return 'default';
    }
  };

  const renderRow = (notice: any) => (
    <>
      <TableCell>{notice.title}</TableCell>
      <TableCell>
        <Chip
          label={notice.type}
          size="small"
          color={getTypeColor(notice.type)}
        />
      </TableCell>
      <TableCell>
        <Chip
          label={notice.status}
          size="small"
          color={getStatusColor(notice.status)}
        />
      </TableCell>
      <TableCell>{notice.author}</TableCell>
      <TableCell>{notice.createdAt}</TableCell>
      <TableCell align="right">{notice.viewCount}</TableCell>
      <TableCell align="right">
        <Tooltip title="상세보기">
          <IconButton
            size="small"
            onClick={() => handleView(notice.id)}
            color="primary"
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="수정">
          <IconButton
            size="small"
            onClick={() => handleEdit(notice.id)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="삭제">
          <IconButton
            size="small"
            onClick={() => handleDelete(notice.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </>
  );

  return (
    <Box>
      <DataTable
        columns={columns}
        data={mockNotices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={mockNotices.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        renderRow={renderRow}
        searchPanel={
          <SearchPanel
            onSearch={handleSearch}
            onAdd={handleAdd}
            placeholder="제목 또는 내용을 입력하세요"
            addButtonLabel="공지사항 등록"
          />
        }
        stickyHeader
      />
    </Box>
  );
};

export default NoticeList;
