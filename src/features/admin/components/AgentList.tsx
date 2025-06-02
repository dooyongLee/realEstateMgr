import React from 'react';
import { Box, Typography } from '@mui/material';
import DataTable, { Column } from '../../../components/common/DataTable';
import StatusRadioGroup from '../../../components/common/StatusRadioGroup';
import ActionButtons from '../../../components/common/ActionButtons';

interface Agent {
  id: string;
  name: string;
  licenseNumber: string;
  phone: string;
  status: 'active' | 'inactive';
}

interface Company {
  id: string;
  status: 'active' | 'inactive';
  agents: Agent[];
}

interface AgentListProps {
  company: Company;
  onAgentStatusChange: (companyId: string, agentId: string, status: 'active' | 'inactive') => void;
  onAgentEdit: (companyId: string, agentId: string) => void;
  onAgentDelete: (agentId: string) => void;
}

const AgentList: React.FC<AgentListProps> = ({
  company,
  onAgentStatusChange,
  onAgentEdit,
  onAgentDelete,
}) => {
  const columns: Column<Agent>[] = [
    { id: 'name', label: '이름', minWidth: 170 },
    { id: 'licenseNumber', label: '공인중개사 등록번호', minWidth: 130 },
    { id: 'phone', label: '연락처', minWidth: 130 },
    {
      id: 'status',
      label: '상태',
      minWidth: 100,
      render: (row) => (
        <StatusRadioGroup
          value={row.status}
          onChange={(status) => onAgentStatusChange(company.id, row.id, status)}
          size="small"
          disabled={company.status === 'inactive'}
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
          onEdit={() => onAgentEdit(company.id, row.id)}
          onDelete={() => onAgentDelete(row.id)}
        />
      ),
    },
  ];

  return (
    <Box sx={{ pl: 4 }}>
      <Typography variant="subtitle1" gutterBottom>
        소속 공인중개사 목록
      </Typography>
      <DataTable
        columns={columns}
        data={company.agents}
        getRowId={(row) => row.id}
        size="small"
      />
    </Box>
  );
};

export default AgentList; 