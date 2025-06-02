import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Paper, Card, TablePagination } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import StatusRadioGroup from '../../components/common/StatusRadioGroup';
import ActionButtons from '../../components/common/ActionButtons';
import DataTable, { Column } from '../../components/common/DataTable';
import TableToolbar from '../../components/common/TableToolbar';
import FormDialog from '../../components/common/FormDialog';
import PageHeader from '../../components/common/PageHeader';
import AgentList from './components/AgentList';
import SearchPanel from '@/components/common/search/SearchPanel';

interface Agent {
  id: string;
  name: string;
  licenseNumber: string;
  phone: string;
  status: 'active' | 'inactive';
}

interface Company {
  id: string;
  name: string;
  licenseNumber: string;
  address: string;
  phone: string;
  status: 'active' | 'inactive';
  agents: Agent[];
}

interface RealtorFormData {
  name: string;
  licenseNumber: string;
  address?: string;
  phone: string;
  status: 'active' | 'inactive';
}

// Mock data
const mockRealtorCompanies: Company[] = [
  {
    id: '1',
    name: '행복공인중개사',
    licenseNumber: '12345-67890',
    address: '서울시 강남구',
    phone: '02-1234-5678',
    status: 'active',
    agents: [
      {
        id: '1-1',
        name: '김중개',
        licenseNumber: 'A-12345',
        phone: '010-1234-5678',
        status: 'active',
      },
      {
        id: '1-2',
        name: '이중개',
        licenseNumber: 'A-12346',
        phone: '010-2345-6789',
        status: 'inactive',
      },
    ],
  },
  {
    id: '2',
    name: '미래공인중개사',
    licenseNumber: '23456-78901',
    address: '서울시 서초구',
    phone: '02-2345-6789',
    status: 'active',
    agents: [
      {
        id: '2-1',
        name: '박중개',
        licenseNumber: 'A-12347',
        phone: '010-3456-7890',
        status: 'active',
      },
    ],
  },
];

const RealtorManagement = () => {
  const [companies, setCompanies] = useState<Company[]>(mockRealtorCompanies);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'company' | 'agent'>('company');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [formData, setFormData] = useState<RealtorFormData>({
    name: '',
    licenseNumber: '',
    address: '',
    phone: '',
    status: 'active',
  });

  const handleOpenDialog = (type: 'company' | 'agent', companyId?: string, agentId?: string) => {
    setDialogType(type);
    
    // 등록 모드인 경우 (companyId가 없거나 agentId가 없는 경우)
    if (!companyId || (type === 'agent' && !agentId)) {
      setSelectedCompany(null);
      setSelectedAgent(null);
      setFormData({
        name: '',
        licenseNumber: '',
        address: '',
        phone: '',
        status: 'active',
      });
    } else {
      // 수정 모드인 경우
      setSelectedCompany(companyId);
      setSelectedAgent(agentId || null);
      
      if (type === 'company') {
        const company = companies.find(c => c.id === companyId);
        if (company) {
          setFormData({
            name: company.name,
            licenseNumber: company.licenseNumber,
            address: company.address,
            phone: company.phone,
            status: company.status,
          });
        }
      } else if (type === 'agent' && agentId) {
        const company = companies.find(c => c.id === companyId);
        const agent = company?.agents.find(a => a.id === agentId);
        if (agent) {
          setFormData({
            name: agent.name,
            licenseNumber: agent.licenseNumber,
            phone: agent.phone,
            status: agent.status,
          });
        }
      }
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
    setSelectedAgent(null);
  };

  const handleFormChange = (field: keyof RealtorFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormStatusChange = (status: 'active' | 'inactive') => {
    setFormData(prev => ({ ...prev, status }));
  };

  const handleSubmit = () => {
    // TODO: API 연동
    console.log('Submit:', { type: dialogType, companyId: selectedCompany, agentId: selectedAgent, formData });
    handleCloseDialog();
  };

  const handleCompanyStatusChange = (companyId: string, newStatus: 'active' | 'inactive') => {
    setCompanies(prevCompanies => 
      prevCompanies.map(company => {
        if (company.id === companyId) {
          const updatedAgents = company.agents.map(agent => ({
            ...agent,
            status: newStatus
          }));
          
          return {
            ...company,
            status: newStatus,
            agents: updatedAgents
          };
        }
        return company;
      })
    );
  };

  const handleDelete = (type: 'company' | 'agent', id: string) => {
    // TODO: API 연동
    console.log('Delete:', { type, id });
  };

  const handleAgentStatusChange = (companyId: string, agentId: string, newStatus: 'active' | 'inactive') => {
    setCompanies(prevCompanies =>
      prevCompanies.map(company => {
        if (company.id === companyId) {
          const updatedAgents = company.agents.map(agent =>
            agent.id === agentId ? { ...agent, status: newStatus } : agent
          );
          return { ...company, agents: updatedAgents };
        }
        return company;
      })
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 현재 페이지의 데이터만 표시
  const paginatedCompanies = companies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const columns: Column<Company>[] = [
    { id: 'name', label: '사업자명', minWidth: 170 },
    { id: 'licenseNumber', label: '사업자등록번호', minWidth: 130 },
    { id: 'address', label: '주소', minWidth: 200 },
    { id: 'phone', label: '연락처', minWidth: 130 },
    {
      id: 'status',
      label: '상태',
      minWidth: 100,
      render: (row) => (
        <StatusRadioGroup
          value={row.status}
          onChange={(status) => handleCompanyStatusChange(row.id, status)}
          size="small"
        />
      ),
    },
    {
      id: 'actions',
      label: '관리',
      align: 'right',
      minWidth: 100,
      render: (row) => (
        <ActionButtons
          onAdd={() => handleOpenDialog('agent', row.id, undefined)}
          onEdit={() => handleOpenDialog('company', row.id, undefined)}
          onDelete={() => handleDelete('company', row.id)}
          showAdd
        />
      ),
    },
  ];

  return (
    <Box>
      
      <Card 
        sx={{ 
          mt: 3,
          '& .MuiTableRow-root': {
            backgroundColor: 'white',
          },
          '& .MuiTableRow-head': {
            backgroundColor: 'white',
          },
          '& .MuiTableCell-head': {
            backgroundColor: 'white',
          }
        }}
      >
        <SearchPanel
          title="공인중개사업자"
          onAdd={() => handleOpenDialog('company')}
          onSearch={(value) => console.log('Search:', value)}
        />
        <DataTable
          columns={columns}
          data={paginatedCompanies}
          getRowId={(row) => row.id}
          stickyHeader
          maxHeight="calc(100vh - 380px)"
          expandable
          expandedContent={(company) => (
            <AgentList
              company={company}
              onAgentStatusChange={handleAgentStatusChange}
              onAgentEdit={(companyId, agentId) => handleOpenDialog('agent', companyId, agentId)}
              onAgentDelete={(agentId) => handleDelete('agent', agentId)}
            />
          )}
        />
        <TablePagination
          component="div"
          count={companies.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Rows per page"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
        />
      </Card>

      <FormDialog
        open={openDialog}
        title={`${dialogType === 'company' ? '공인중개사업자' : '공인중개사'} ${
          (!selectedCompany && !selectedAgent) ? '등록' : '수정'
        }`}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="이름"
            fullWidth
            value={formData.name}
            onChange={(e) => handleFormChange('name', e.target.value)}
          />
          <TextField
            label={dialogType === 'company' ? '사업자등록번호' : '공인중개사 등록번호'}
            fullWidth
            value={formData.licenseNumber}
            onChange={(e) => handleFormChange('licenseNumber', e.target.value)}
          />
          {dialogType === 'company' && (
            <TextField
              label="주소"
              fullWidth
              value={formData.address || ''}
              onChange={(e) => handleFormChange('address', e.target.value)}
            />
          )}
          <TextField
            label="연락처"
            fullWidth
            value={formData.phone}
            onChange={(e) => handleFormChange('phone', e.target.value)}
          />
          <Box>
            <Typography variant="subtitle2" gutterBottom>상태</Typography>
            <StatusRadioGroup
              value={formData.status}
              onChange={handleFormStatusChange}
            />
          </Box>
        </Box>
      </FormDialog>
    </Box>
  );
};

export default RealtorManagement; 