import { Card, CardContent, Typography, Box } from '@mui/material';
import { DataGrid as MuiDataGrid, GridColDef } from '@mui/x-data-grid';
import { ReactNode } from 'react';

interface DataGridProps {
  title: string;
  rows: any[];
  columns: GridColDef[];
  loading?: boolean;
  toolbar?: ReactNode;
  onRowClick?: (row: any) => void;
}

const DataGrid = ({ title, rows, columns, loading, toolbar, onRowClick }: DataGridProps) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          {toolbar}
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <MuiDataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowClick={(params) => onRowClick?.(params.row)}
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DataGrid; 