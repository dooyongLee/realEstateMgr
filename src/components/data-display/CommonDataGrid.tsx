import React from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface CommonDataGridProps {
  rows: any[];
  columns: GridColDef[];
  onAdd?: () => void;
  onDelete?: (ids: GridRowSelectionModel) => void;
}

const CommonDataGrid: React.FC<CommonDataGridProps> = ({
  rows,
  columns,
  onAdd,
  onDelete
}) => {
  const [selectionModel, setSelectionModel] = React.useState<GridRowSelectionModel>([]);

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        {onAdd && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
          >
            추가
          </Button>
        )}
        {onDelete && selectionModel.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(selectionModel)}
          >
            삭제
          </Button>
        )}
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={handleSelectionChange}
        selectionModel={selectionModel}
      />
    </Box>
  );
};

export default CommonDataGrid; 