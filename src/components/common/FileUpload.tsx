import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormHelperText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  error?: boolean;
  helperText?: string;
  maxFiles?: number;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onChange,
  error,
  helperText,
  maxFiles = 5,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > maxFiles) {
        // TODO: Show error message
        return;
      }
      onChange([...files, ...acceptedFiles]);
    },
    [files, maxFiles, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.split(',').reduce((acc, ext) => {
      acc[ext] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles,
  });

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  return (
    <Box>
      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          border: '2px dashed',
          borderColor: error ? 'error.main' : isDragActive ? 'primary.main' : 'grey.300',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.main',
          },
        }}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <CloudUploadIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="body1" color="text.secondary">
            {isDragActive
              ? '파일을 여기에 놓으세요'
              : '파일을 드래그하거나 클릭하여 업로드하세요'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`최대 ${maxFiles}개 파일, ${accept} 형식`}
          </Typography>
        </Box>
      </Paper>
      {files.length > 0 && (
        <List>
          {files.map((file, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={file.name}
                secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveFile(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      {error && helperText && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </Box>
  );
};

export default FileUpload; 