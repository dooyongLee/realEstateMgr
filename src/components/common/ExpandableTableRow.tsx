import React from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface ExpandableTableRowProps {
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  expandCellWidth?: string | number;
}

const ExpandableTableRow: React.FC<ExpandableTableRowProps> = ({
  isExpanded,
  onToggle,
  children,
  expandCellWidth = '50px',
}) => {
  return (
    <TableRow>
      <TableCell width={expandCellWidth}>
        <IconButton size="small" onClick={onToggle}>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </TableCell>
      {children}
    </TableRow>
  );
};

export default ExpandableTableRow; 