import React from 'react';
import { Box, Typography, Grid, Chip, Paper, Stepper, Step, StepLabel, Button, List, ListItem, ListItemIcon, ListItemText, Divider, Alert, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import DetailLayout from '../../components/layout/DetailLayout';
import { CheckCircle, Error, Warning, Info } from '@mui/icons-material';
import { ContractType, ContractStatus } from '@/types/contract';
import { addMonths, differenceInDays, format } from 'date-fns';

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
  { id: 'DRAFT', label: '계약서 작성' },
  { id: 'PENDING_REVIEW', label: '검토 중' },
  { id: 'SIGNED', label: '서명 완료' },
  { id: 'COMPLETED', label: '계약 완료' },
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
}

// Mock data for development
const mockContracts: Contract[] = [
  {
    id: 1,
    propertyTitle: '강남 아파트',
    propertyType: '아파트',
    propertySize: '84.5㎡',
    propertyLocation: '서울시 강남구',
    tenantName: '홍길동',
    tenantPhone: '010-1234-5678',
    tenantEmail: 'hong@example.com',
    startDate: '2024-03-01',
    contractDate: '2024-02-20',
    deposit: '5000만원',
    monthlyRent: '200만원',
    type: 'RENT',
    status: 'SIGNED',
    createdAt: '2024-02-15',
    description: '강남역 도보 5분 거리에 위치한 3룸 아파트입니다.',
    terms: [
      '계약기간: 1년',
      '월세 지불일: 매월 1일',
      '관리비: 월 15만원',
      '주차: 1대 가능',
      '반려동물: 불가능',
    ],
    documents: [
      { id: 'rent_contract', name: '임대차계약서', uploaded: true, uploadedAt: '2024-02-20' },
      { id: 'property_cert', name: '부동산등기부등본', uploaded: true, uploadedAt: '2024-02-20' },
      { id: 'commission_cert', name: '중개수수료 영수증', uploaded: false },
    ],
    notes: '임차인이 반려동물을 키우고 있어서, 계약 시 반려동물 관련 특별 조항을 추가했습니다. 또한 주차 공간이 제한적이어서, 주차 관련 규정을 명확히 했습니다.',
  },
  {
    id: 2,
    propertyTitle: '송파 오피스텔',
    propertyType: '오피스텔',
    propertySize: '59.8㎡',
    propertyLocation: '서울시 송파구',
    tenantName: '김철수',
    tenantPhone: '010-9876-5432',
    tenantEmail: 'kim@example.com',
    startDate: '2024-04-01',
    contractDate: '2024-03-14',
    deposit: '3000만원',
    monthlyRent: '150만원',
    type: 'RENT',
    status: 'PENDING_REVIEW',
    createdAt: '2024-03-14',
    description: '잠실역 도보 3분 거리에 위치한 2룸 오피스텔입니다.',
    terms: [
      '계약기간: 1년',
      '월세 지불일: 매월 1일',
      '관리비: 월 10만원',
      '주차: 불가능',
      '반려동물: 가능',
    ],
    documents: [
      { id: 'rent_contract', name: '임대차계약서', uploaded: false },
      { id: 'property_cert', name: '부동산등기부등본', uploaded: false },
      { id: 'commission_cert', name: '중개수수료 영수증', uploaded: false },
    ],
    notes: '임차인이 외국인이라 계약서를 영문으로도 작성했습니다. 또한 관리비에 인터넷 요금이 포함되어 있어 별도 안내가 필요합니다.',
  },
];

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contract = mockContracts.find(c => c.id === Number(id));
  const [statusChangeDialog, setStatusChangeDialog] = React.useState(false);
  const [newStatus, setNewStatus] = React.useState<ContractStatus | null>(null);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '' });

  if (!contract) {
    return <Typography>계약을 찾을 수 없습니다.</Typography>;
  }

  // 계약 만료일 계산
  const isLeaseOrRent = contract.type === 'LEASE' || contract.type === 'RENT';
  const startDate = new Date(contract.startDate);
  const endDate = addMonths(startDate, 12); // 1년 계약 기준
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

  const getStatusColor = (status: ContractStatus) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'SIGNED':
        return 'primary';
      case 'PENDING_REVIEW':
        return 'warning';
      case 'CANCELLED':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const getCurrentStep = (status: ContractStatus) => {
    return contractSteps.findIndex(step => step.id === status);
  };

  const getDocumentStatus = (docId: string) => {
    const doc = contract.documents?.find(d => d.id === docId);
    if (!doc) return { icon: <Error color="error" />, text: '미제출' };
    if (doc.uploaded) return { icon: <CheckCircle color="success" />, text: '제출완료' };
    return { icon: <Error color="error" />, text: '미제출' };
  };

  const getDocumentProgress = () => {
    const totalDocs = requiredDocuments[contract.type].length;
    const uploadedDocs = contract.documents.filter(d => d.uploaded).length;
    return (uploadedDocs / totalDocs) * 100;
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
      onEdit={() => console.log('Edit contract:', contract.id)}
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
                {contract.status === 'COMPLETED' && '계약이 완료되었습니다.'}
                {contract.status === 'SIGNED' && '계약서 서명이 완료되었습니다.'}
                {contract.status === 'PENDING_REVIEW' && '계약서 검토가 진행 중입니다.'}
                {contract.status === 'DRAFT' && '계약서 작성이 진행 중입니다.'}
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
                유형
              </Typography>
              <Typography variant="body1">{contract.propertyType}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                크기
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

        {/* 임차인 정보 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              임차인 정보
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                이름
              </Typography>
              <Typography variant="body1">{contract.tenantName}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                연락처
              </Typography>
              <Typography variant="body1">{contract.tenantPhone}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                이메일
              </Typography>
              <Typography variant="body1">{contract.tenantEmail}</Typography>
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
                {contract.documents.filter(d => d.uploaded).length} / {requiredDocuments[contract.type].length} 서류 제출 완료
              </Typography>
            </Box>
            <List>
              {requiredDocuments[contract.type]?.map((doc) => {
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
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              공공 서류 발급
            </Typography>
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
            변경
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