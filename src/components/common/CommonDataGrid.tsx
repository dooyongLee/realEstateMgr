import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface CommonDataGridProps {
  rows: any[];
  columns: GridColDef[];
  loading?: boolean;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  checkboxSelection?: boolean;
  disableSelectionOnClick?: boolean;
  onRowClick?: (params: any) => void;
}

const CommonDataGrid = ({
  rows,
  columns,
  loading = false,
  pageSize = 10,
  rowsPerPageOptions = [10, 25, 50],
  checkboxSelection = false,
  disableSelectionOnClick = false,
  onRowClick,
}: CommonDataGridProps) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: { pageSize },
          },
        }}
        pageSizeOptions={rowsPerPageOptions}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableSelectionOnClick}
        onRowClick={onRowClick}
        slots={{
          toolbar: GridToolbar,
        }}
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />
    </Box>
  );
};

export default CommonDataGrid; 