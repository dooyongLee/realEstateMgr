import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

export interface Column<T> {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: any, row: T) => React.ReactNode;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowId: (row: T) => string;
  onRowClick?: (row: T) => void;
  hover?: boolean;
  size?: 'small' | 'medium';
  stickyHeader?: boolean;
  maxHeight?: string | number;
  expandable?: boolean;
  expandedContent?: (row: T) => React.ReactNode;
}

const DataTable = <T extends object>({
  columns,
  data,
  getRowId,
  onRowClick,
  hover = true,
  size = 'medium',
  stickyHeader = false,
  maxHeight,
  expandable = false,
  expandedContent,
}: DataTableProps<T>) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const handleExpandClick = (rowId: string) => {
    setExpandedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight }}>
      <Table stickyHeader={stickyHeader} size={size}>
        <TableHead>
          <TableRow>
            {expandable && <TableCell padding="checkbox" />}
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            const rowId = getRowId(row);
            const isExpanded = expandedRows.includes(rowId);

            return (
              <React.Fragment key={rowId}>
                <TableRow
                  hover={hover}
                  onClick={() => onRowClick?.(row)}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {expandable && (
                    <TableCell padding="checkbox">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExpandClick(rowId);
                        }}
                      >
                        {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </TableCell>
                  )}
                  {columns.map((column) => {
                    const value = (row as any)[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.render
                          ? column.render(row)
                          : column.format
                          ? column.format(value, row)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
                {expandable && isExpanded && expandedContent && (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} sx={{ p: 0 }}>
                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 2 }}>
                          {expandedContent(row)}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable; 