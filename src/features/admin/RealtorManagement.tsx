import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TablePagination,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

// 임시 목업 데이터
const mockRealtorCompanies = [
  {
    id: '1',
    name: '행복공인중개사',
    licenseNumber: '12345-67890',
    address: '서울시 강남구',
    phone: '02-1234-5678',
    status: '활성',
    agents: [
      {
        id: '1-1',
        name: '김중개',
        licenseNumber: 'A-12345',
        phone: '010-1234-5678',
        status: '활성',
      },
      {
        id: '1-2',
        name: '이중개',
        licenseNumber: 'A-12346',
        phone: '010-2345-6789',
        status: '활성',
      },
    ],
  },
  {
    id: '2',
    name: '미래공인중개사',
    licenseNumber: '23456-78901',
    address: '서울시 서초구',
    phone: '02-2345-6789',
    status: '활성',
    agents: [
      {
        id: '2-1',
        name: '박중개',
        licenseNumber: 'A-12347',
        phone: '010-3456-7890',
        status: '활성',
      },
    ],
  },
];

const RealtorManagement = () => {
  const [expandedCompanies, setExpandedCompanies] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'company' | 'agent'>('company');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    address: '',
    phone: '',
  });

  const handleExpandCompany = (companyId: string) => {
    setExpandedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleOpenDialog = (type: 'company' | 'agent', companyId?: string) => {
    setDialogType(type);
    setSelectedCompany(companyId || null);
    setFormData({
      name: '',
      licenseNumber: '',
      address: '',
      phone: '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
  };

  const handleSubmit = () => {
    // TODO: API 연동
    console.log('Submit:', { type: dialogType, companyId: selectedCompany, formData });
    handleCloseDialog();
  };

  const handleDelete = (type: 'company' | 'agent', id: string) => {
    // TODO: API 연동
    console.log('Delete:', { type, id });
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('company')}
        >
          공인중개사업자 등록
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="50px" />
                <TableCell>이름</TableCell>
                <TableCell>사업자등록번호</TableCell>
                <TableCell>주소</TableCell>
                <TableCell>연락처</TableCell>
                <TableCell>상태</TableCell>
                <TableCell align="right">관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockRealtorCompanies.map((company) => (
                <React.Fragment key={company.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleExpandCompany(company.id)}
                      >
                        {expandedCompanies.includes(company.id) ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.licenseNumber}</TableCell>
                    <TableCell>{company.address}</TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>{company.status}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="공인중개사 추가">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog('agent', company.id)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="수정">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog('company', company.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="삭제">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete('company', company.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  {expandedCompanies.includes(company.id) && (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ bgcolor: 'grey.50', py: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle2">
                            소속 공인중개사
                          </Typography>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog('agent', company.id)}
                          >
                            공인중개사 추가
                          </Button>
                        </Box>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>이름</TableCell>
                              <TableCell>공인중개사 등록번호</TableCell>
                              <TableCell>연락처</TableCell>
                              <TableCell>상태</TableCell>
                              <TableCell align="right">관리</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {company.agents.map((agent) => (
                              <TableRow key={agent.id}>
                                <TableCell>{agent.name}</TableCell>
                                <TableCell>{agent.licenseNumber}</TableCell>
                                <TableCell>{agent.phone}</TableCell>
                                <TableCell>{agent.status}</TableCell>
                                <TableCell align="right">
                                  <Tooltip title="수정">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleOpenDialog('agent', company.id)}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="삭제">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleDelete('agent', agent.id)}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'company' ? '공인중개사업자' : '공인중개사'} {selectedCompany ? '수정' : '등록'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="이름"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label={dialogType === 'company' ? '사업자등록번호' : '공인중개사 등록번호'}
              fullWidth
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            />
            {dialogType === 'company' && (
              <TextField
                label="주소"
                fullWidth
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            )}
            <TextField
              label="연락처"
              fullWidth
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedCompany ? '수정' : '등록'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RealtorManagement; 