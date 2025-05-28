import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FileDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
}

const FileDropzone = ({ onDrop, accept, maxFiles = 1, maxSize = 5242880 }: FileDropzoneProps) => {
  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept,
    maxFiles,
    maxSize,
  });

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 3,
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'action.hover',
        },
      }}
    >
      <input {...getInputProps()} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        <Typography variant="h6" align="center">
          {isDragActive ? '파일을 여기에 놓으세요' : '파일을 드래그하거나 클릭하여 업로드하세요'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {maxFiles > 1
            ? `최대 ${maxFiles}개의 파일을 업로드할 수 있습니다`
            : '하나의 파일만 업로드할 수 있습니다'}
          <br />
          {`최대 파일 크기: ${Math.round(maxSize / 1024 / 1024)}MB`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FileDropzone; 