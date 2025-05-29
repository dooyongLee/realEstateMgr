import React, { useCallback, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Grid,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  error?: boolean;
  helperText?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onChange,
  maxFiles = 10,
  accept = 'image/*',
  error,
  helperText,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      setIsLoading(true);

      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith('image/')
      );

      if (files.length + droppedFiles.length > maxFiles) {
        alert(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
        setIsLoading(false);
        return;
      }

      onChange([...files, ...droppedFiles]);
      setIsLoading(false);
    },
    [files, maxFiles, onChange]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setIsLoading(true);
        const selectedFiles = Array.from(e.target.files).filter((file) =>
          file.type.startsWith('image/')
        );

        if (files.length + selectedFiles.length > maxFiles) {
          alert(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
          setIsLoading(false);
          return;
        }

        onChange([...files, ...selectedFiles]);
        setIsLoading(false);
      }
    },
    [files, maxFiles, onChange]
  );

  const handleRemoveFile = useCallback(
    (index: number) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      onChange(newFiles);
    },
    [files, onChange]
  );

  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          border: '2px dashed',
          borderColor: error ? 'error.main' : isDragging ? 'primary.main' : 'grey.300',
          backgroundColor: isDragging ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept={accept}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          <Typography variant="h6" color="textSecondary">
            {isDragging ? '파일을 여기에 놓으세요' : '파일을 드래그하거나 클릭하여 업로드하세요'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            최대 {maxFiles}개의 이미지 파일 (JPG, PNG, GIF)
          </Typography>
        </Box>
      </Paper>

      {error && helperText && (
        <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
          {helperText}
        </Typography>
      )}

      {files.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Paper
                variant="outlined"
                sx={{
                  p: 1,
                  position: 'relative',
                  height: 150,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <>
                    <Box
                      component="img"
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FileUpload; 