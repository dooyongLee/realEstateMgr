import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  SxProps,
  Theme,
} from '@mui/material';
import { ReactNode } from 'react';

export interface Column {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  width?: string | number;
  minWidth?: string | number;
}

export interface DataTableProps<T = any> {
  columns: Column[];
  data: T[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  renderRow: (row: T) => ReactNode;
  searchPanel?: ReactNode;
  sx?: SxProps<Theme>;
  stickyHeader?: boolean;
  elevation?: number;
}

const DataTable = <T extends object>({
  columns,
  data,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  renderRow,
  searchPanel,
  sx,
  stickyHeader = false,
  elevation = 1,
}: DataTableProps<T>) => {
  return (
    <Paper elevation={elevation} sx={sx}>
      {searchPanel && <Box sx={{ p: 2 }}>{searchPanel}</Box>}
      <TableContainer>
        <Table stickyHeader={stickyHeader}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {renderRow(row)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
        labelRowsPerPage="페이지당 행 수"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} / ${count}`
        }
      />
    </Paper>
  );
};

export default DataTable; 