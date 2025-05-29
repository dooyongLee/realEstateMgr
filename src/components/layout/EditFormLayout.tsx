import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

interface EditFormLayoutProps {
  title: string;
  steps?: string[];
  activeStep?: number;
  error?: string | null;
  isSubmitting?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
}

const EditFormLayout: React.FC<EditFormLayoutProps> = ({
  title,
  steps,
  activeStep = 0,
  error,
  isSubmitting = false,
  onBack,
  onNext,
  onSubmit,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <Box component="form" sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card elevation={3}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Button
              onClick={() => navigate(-1)}
              sx={{ mr: 2 }}
            >
              ← 뒤로
            </Button>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
          </Box>

          {steps && (
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 4 }}>
            {children}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            {onBack && (
              <Button
                onClick={onBack}
                sx={{ mr: 1 }}
              >
                이전
              </Button>
            )}
            <Box>
              {onSubmit ? (
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  onClick={onSubmit}
                >
                  저장하기
                </LoadingButton>
              ) : onNext ? (
                <Button
                  variant="contained"
                  onClick={onNext}
                >
                  다음
                </Button>
              ) : null}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditFormLayout; 