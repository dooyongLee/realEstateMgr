import React from 'react';
import {
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  showAdd?: boolean;
  size?: 'small' | 'medium';
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  onAdd,
  showAdd = false,
  size = 'small',
}) => {
  return (
    <>
      {showAdd && onAdd && (
        <Tooltip title="추가">
          <IconButton size={size} onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title="수정">
          <IconButton size={size} onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title="삭제">
          <IconButton size={size} onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default ActionButtons; 