import { Box, Button, TextField } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface AddButtonProps {
  title: string;
  onClick: () => void;
}

export const AddButton = ({ title, onClick }: AddButtonProps) => {
  return (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={onClick}
    >
      {title} 추가
    </Button>
  );
};

interface SearchPanelProps {
  title: string;
  onAdd: () => void;
  onSearch: (value: string) => void;
}

const SearchPanel = ({ title, onAdd, onSearch }: SearchPanelProps) => {
  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          placeholder="검색어를 입력하세요"
          onChange={(e) => onSearch(e.target.value)}
        />
      </Box>
      <AddButton title={title} onClick={onAdd} />
    </Box>
  );
};

export default SearchPanel; 