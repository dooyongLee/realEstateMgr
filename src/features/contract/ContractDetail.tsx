import React, { useState } from 'react';
import { Box, Typography, Grid, Chip, Paper, Stepper, Step, StepLabel, Button, List, ListItem, ListItemIcon, ListItemText, Divider, Alert, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import DetailLayout from '../../components/layout/DetailLayout';
import { CheckCircle, Error, Warning, Info, ContentCopy, Home as HomeIcon, LocationOn as LocationIcon, AttachMoney as MoneyIcon, CalendarToday as CalendarIcon, Person as PersonIcon, Phone as PhoneIcon, Description as DescriptionIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ContractType, ContractStatus } from '@/types/contract';
import { addMonths, differenceInDays, format } from 'date-fns';
import { contracts } from '../../mocks/contracts';

// 필수 서류 정의
const requiredDocuments: Record<ContractType, Array<{ id: string; name: string; description: string }>> = {
  SALE: [
    { id: 'sale_contract', name: '매매계약서', description: '매매계약서 원본' },
    { id: 'property_cert', name: '부동산등기부등본', description: '최근 발급된 등기부등본' },
    { id: 'tax_cert', name: '세금계산서', description: '양도소득세 계산서' },
    { id: 'commission_cert', name: '중개수수료 영수증', description: '중개수수료 지급 영수증' },
    { id: 'ownership_cert', name: '소유권이전등기필증', description: '소유권 이전 등기 필증' },
  ],
  LEASE: [
    { id: 'lease_contract', name: '전세계약서', description: '전세계약서 원본' },
    { id: 'property_cert', name: '부동산등기부등본', description: '최근 발급된 등기부등본' },
    { id: 'commission_cert', name: '중개수수료 영수증', description: '중개수수료 지급 영수증' },
    { id: 'lease_registration', name: '전세권설정등기필증', description: '전세권 설정 등기 필증' },
  ],
  RENT: [
    { id: 'rent_contract', name: '임대차계약서', description: '임대차계약서 원본' },
    { id: 'property_cert', name: '부동산등기부등본', description: '최근 발급된 등기부등본' },
    { id: 'commission_cert', name: '중개수수료 영수증', description: '중개수수료 지급 영수증' },
    { id: 'rent_registration', name: '임대차계약등록필증', description: '임대차계약 등록 필증' },
  ],
};

// 계약 상태 단계 정의
const contractSteps = [
  { id: '진행중', label: '진행중' },
  { id: '완료', label: '완료' },
  { id: '취소', label: '취소' },
];

interface ContractDocument {
  id: string;
  name: string;
  uploaded: boolean;
  uploadedAt?: string;
}

interface Contract {
  id: number;
  propertyTitle: string;
  propertyType: string;
  propertySize: string;
  propertyLocation: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  startDate: string;
  contractDate: string;
  deposit: string;
  monthlyRent: string;
  type: ContractType;
  status: ContractStatus;
  createdAt: string;
  description: string;
  terms: string[];
  documents: ContractDocument[];
  notes?: string;
  propertyFloor?: string;
  propertyDirection?: string;
  propertyYear?: string;
  propertyStructure?: string;
}

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contract = contracts.find(c => c.id === Number(id));
  const [statusChangeDialog, setStatusChangeDialog] = useState(false);
  const [newStatus, setNewStatus] = useState<ContractStatus | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  if (!contract) {
    return <Typography>계약을 찾을 수 없습니다.</Typography>;
  }

  // 계약 만료일 계산
  const isLeaseOrRent = contract.type === '임대';
  const startDate = new Date(contract.startDate);
  const endDate = contract.endDate ? new Date(contract.endDate) : addMonths(startDate, 12); // 1년 계약 기준
  const daysUntilExpiry = differenceInDays(endDate, new Date());
  const showExpiryAlert = isLeaseOrRent && daysUntilExpiry <= 60 && daysUntilExpiry > 0;

  const handleStatusChange = async (status: ContractStatus) => {
    setNewStatus(status);
    setStatusChangeDialog(true);
  };

  const confirmStatusChange = () => {
    // 실제 상태 변경 로직 구현
    setSnackbar({
      open: true,
      message: `계약 상태가 ${newStatus}로 변경되었습니다.`
    });
    setStatusChangeDialog(false);
  };

  const getStatusColor = (status: ContractStatus): 'success' | 'warning' | 'error' => {
    switch (status) {
      case '완료':
        return 'success';
      case '진행중':
        return 'warning';
      case '취소':
        return 'error';
      default:
        return 'warning';
    }
  };

  const getCurrentStep = (status: ContractStatus) => {
    return contractSteps.findIndex(step => step.id === status);
  };

  // 한글 타입을 영문 타입으로 변환
  const getContractTypeKey = (type: string): ContractType => {
    switch (type) {
      case '매매':
        return 'SALE';
      case '임대':
        return 'LEASE';
      case '월세':
        return 'RENT';
      default:
        return 'SALE'; // fallback
    }
  };

  const getDocumentStatus = (docId: string) => {
    const typeKey = getContractTypeKey(contract.type);
    const doc = contract.documents?.find(d => d.id === docId);
    if (!doc) return { icon: <Error color="error" />, text: '미제출' };
    if (doc.uploaded) return { icon: <CheckCircle color="success" />, text: '제출완료' };
    return { icon: <Error color="error" />, text: '미제출' };
  };

  const getDocumentProgress = () => {
    const typeKey = getContractTypeKey(contract.type);
    const totalDocs = requiredDocuments[typeKey]?.length ?? 0;
    const uploadedDocs = contract.documents.filter(d => d.uploaded).length;
    return totalDocs === 0 ? 0 : (uploadedDocs / totalDocs) * 100;
  };

  const getImportantTerms = () => {
    return contract.terms.filter(term => 
      term.includes('보증금') || 
      term.includes('월세') || 
      term.includes('계약기간') ||
      term.includes('특별')
    );
  };

  return (
    <DetailLayout
      title={contract.propertyTitle}
      status={contract.status}
      statusColor={getStatusColor(contract.status)}
      backUrl="/contracts"
      onEdit={() => {
        console.log('Navigating to edit page', { contractId: contract.id });
        navigate(`/contracts/${contract.id}/edit`);
      }}
      onDelete={() => console.log('Delete contract:', contract.id)}
    >
      <Grid container spacing={3}>
        {/* 계약 만료 알림 */}
        {showExpiryAlert && (
          <Grid item xs={12}>
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 2,
                '& .MuiAlert-message': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }
              }}
            >
              <Warning />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  재계약 기간 도래
                </Typography>
                <Typography variant="body2">
                  계약 만료일까지 {daysUntilExpiry}일 남았습니다. 재계약 준비를 시작하세요.
                </Typography>
              </Box>
            </Alert>
          </Grid>
        )}

        {/* 계약 상태 단계 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              계약 진행 상태
            </Typography>
            <Stepper activeStep={getCurrentStep(contract.status)} alternativeLabel>
              {contractSteps.map((step) => (
                <Step key={step.id}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {contract.status === '완료' && '계약이 완료되었습니다.'}
                {contract.status === '진행중' && '계약이 진행 중입니다.'}
                {contract.status === '취소' && '계약이 취소되었습니다.'}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* 매물 정보 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              매물 정보
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                매물 유형
              </Typography>
              <Typography variant="body1">{contract.propertyType}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                전용면적
              </Typography>
              <Typography variant="body1">{contract.propertySize}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                위치
              </Typography>
              <Typography variant="body1">{contract.propertyLocation}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                설명
              </Typography>
              <Typography variant="body1">{contract.description}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* 매물 상세 정보 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              건물 상세 정보
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                건물 방향
              </Typography>
              <Typography variant="body1">{contract.propertyDirection || '정보 없음'}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                건물 층수
              </Typography>
              <Typography variant="body1">{contract.propertyFloor || '정보 없음'}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                건물 연식
              </Typography>
              <Typography variant="body1">{contract.propertyYear || '정보 없음'}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                건물 구조
              </Typography>
              <Typography variant="body1">{contract.propertyStructure || '정보 없음'}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                주차 가능 대수
              </Typography>
              <Typography variant="body1">
                {contract.terms.find(term => term.includes('주차'))?.split(':')[1]?.trim() || '정보 없음'}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                반려동물 가능 여부
              </Typography>
              <Typography variant="body1">
                {contract.terms.find(term => term.includes('반려동물'))?.split(':')[1]?.trim() || '정보 없음'}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* 계약 정보 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              계약 정보
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  시작일
                </Typography>
                <Typography variant="body1">{contract.startDate}</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  계약일
                </Typography>
                <Typography variant="body1">{contract.contractDate}</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  보증금
                </Typography>
                <Typography variant="body1">{contract.deposit}</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  월세
                </Typography>
                <Typography variant="body1">{contract.monthlyRent}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* 필수 서류 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                필수 서류
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {contract.type === 'SALE' && '매매 계약'}
                {contract.type === 'LEASE' && '전세 계약'}
                {contract.type === 'RENT' && '월세 계약'}
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <LinearProgress 
                variant="determinate" 
                value={getDocumentProgress()} 
                sx={{ height: 8, borderRadius: 4, mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary" align="right">
                {contract.documents.filter(d => d.uploaded).length} / {requiredDocuments[getContractTypeKey(contract.type)].length} 서류 제출 완료
              </Typography>
            </Box>
            <List>
              {requiredDocuments[getContractTypeKey(contract.type)]?.map((doc) => {
                const status = getDocumentStatus(doc.id);
                return (
                  <React.Fragment key={doc.id}>
                    <ListItem>
                      <ListItemIcon>{status.icon}</ListItemIcon>
                      <ListItemText
                        primary={doc.name}
                        secondary={doc.description}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" color={status.text === '제출완료' ? 'success.main' : 'error.main'}>
                          {status.text}
                        </Typography>
                        {status.text === '제출완료' && (
                          <Typography variant="caption" color="text.secondary">
                            {contract.documents?.find(d => d.id === doc.id)?.uploadedAt}
                          </Typography>
                        )}
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
              })}
            </List>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {contract.type === 'SALE' && '• 매매 계약의 경우, 소유권 이전 등기와 양도소득세 납부가 필요합니다.'}
                {contract.type === 'LEASE' && '• 전세 계약의 경우, 전세권 설정 등기가 필요합니다.'}
                {contract.type === 'RENT' && '• 월세 계약의 경우, 임대차계약 등록이 필요합니다.'}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* 계약 조건 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              계약 조건
            </Typography>
            {getImportantTerms().map((term, index) => (
              <Alert 
                key={index} 
                severity="info" 
                sx={{ mb: 2 }}
              >
                {term}
              </Alert>
            ))}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {contract.terms.map((term, index) => (
                <Chip key={index} label={term} />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* 메모 */}
        {contract.notes && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                메모
              </Typography>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'background.default', 
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                  {contract.notes}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        )}

        {/* 액션 버튼 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                공공 서류 발급
              </Typography>
              <Button
                variant="outlined"
                startIcon={<ContentCopy />}
                onClick={() => {
                  navigator.clipboard.writeText(contract.propertyLocation);
                  setSnackbar({
                    open: true,
                    message: '매물 주소가 클립보드에 복사되었습니다.'
                  });
                }}
              >
                매물 주소 복사
              </Button>
            </Box>
            <Grid container spacing={3}>
              {/* 등기소 */}
              <Grid item xs={12} md={3}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'background.default'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      등기소
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => window.open('https://www.iros.go.kr', '_blank')}
                    >
                      사이트 바로가기
                    </Button>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    부동산 등기 관련 서류 발급
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      등기부등본
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      건물등기사항증명서
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      토지등기사항증명서
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      소유권이전등기필증
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              {/* 홈택스 */}
              <Grid item xs={12} md={3}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'background.default'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      홈택스
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => window.open('https://www.hometax.go.kr', '_blank')}
                    >
                      사이트 바로가기
                    </Button>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    세금 관련 서류 발급
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      세금계산서
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      양도소득세 계산서
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      종합소득세 계산서
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      중개수수료 영수증
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              {/* 정부24 */}
              <Grid item xs={12} md={3}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'background.default'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      정부24
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => window.open('https://www.gov.kr', '_blank')}
                    >
                      사이트 바로가기
                    </Button>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    부동산 및 개인 관련 서류 발급
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      주민등록등본
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      건물대장
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      토지대장
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      건물현황도
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      토지이용계획확인서
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              {/* 국토교통부 */}
              <Grid item xs={12} md={3}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'background.default'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      국토교통부
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => window.open('https://rt.molit.go.kr', '_blank')}
                    >
                      사이트 바로가기
                    </Button>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    부동산 가격 및 실거래가 조회
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      부동산 가격공시 확인서
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      실거래가 조회
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Info />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        pointerEvents: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      공시지가 조회
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button variant="outlined" onClick={() => navigate('/contracts')}>
                목록으로
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* 상태 변경 확인 대화상자 */}
      <Dialog
        open={statusChangeDialog}
        onClose={() => setStatusChangeDialog(false)}
      >
        <DialogTitle>계약 상태 변경</DialogTitle>
        <DialogContent>
          <Typography>
            계약 상태를 {newStatus}로 변경하시겠습니까?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusChangeDialog(false)}>취소</Button>
          <Button onClick={confirmStatusChange} variant="contained">
            확인
          </Button>
        </DialogActions>
      </Dialog>

      {/* 알림 스낵바 */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </DetailLayout>
  );
};

export default ContractDetail; 