import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import StatusRadioGroup from '../../../components/common/StatusRadioGroup';
import ActionButtons from '../../../components/common/ActionButtons';

interface Agent {
  id: string;
  name: string;
  licenseNumber: string;
  phone: string;
  status: 'active' | 'inactive';
}

interface AgentTableProps {
  agents: Agent[];
  companyStatus: 'active' | 'inactive';
  onStatusChange: (agentId: string, status: 'active' | 'inactive') => void;
  onEdit: (agentId: string) => void;
  onDelete: (agentId: string) => void;
  onAdd: () => void;
}

const AgentTable: React.FC<AgentTableProps> = ({
  agents,
  companyStatus,
  onStatusChange,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <Box sx={{ bgcolor: 'grey.50', py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, px: 2 }}>
        <Typography variant="subtitle2">
          소속 공인중개사
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onAdd}
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
          {agents.map((agent) => (
            <TableRow key={agent.id}>
              <TableCell>{agent.name}</TableCell>
              <TableCell>{agent.licenseNumber}</TableCell>
              <TableCell>{agent.phone}</TableCell>
              <TableCell>
                <StatusRadioGroup
                  value={agent.status}
                  onChange={(status) => onStatusChange(agent.id, status)}
                  disabled={companyStatus === 'inactive'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <ActionButtons
                  onEdit={() => onEdit(agent.id)}
                  onDelete={() => onDelete(agent.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AgentTable; 