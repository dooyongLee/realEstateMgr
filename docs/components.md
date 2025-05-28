# 컴포넌트 문서

## 공통 컴포넌트

### AccessibleButton
접근성이 개선된 버튼 컴포넌트입니다.

```tsx
import AccessibleButton from '@/components/common/AccessibleButton';

<AccessibleButton
  ariaLabel="저장하기"
  ariaDescribedby="save-description"
  onClick={handleSave}
>
  저장
</AccessibleButton>
```

#### Props
- `ariaLabel`: string (선택) - 스크린 리더가 읽을 레이블
- `ariaDescribedby`: string (선택) - 추가 설명을 위한 ID
- 기타 MUI Button props 지원

### CommonDataGrid
데이터 그리드 컴포넌트입니다.

```tsx
import CommonDataGrid from '@/components/common/CommonDataGrid';

<CommonDataGrid
  rows={data}
  columns={columns}
  loading={isLoading}
  pageSize={10}
  checkboxSelection
  onRowClick={handleRowClick}
/>
```

#### Props
- `rows`: any[] - 표시할 데이터
- `columns`: GridColDef[] - 컬럼 정의
- `loading`: boolean (선택) - 로딩 상태
- `pageSize`: number (선택) - 페이지당 행 수
- `checkboxSelection`: boolean (선택) - 체크박스 선택 활성화
- `onRowClick`: function (선택) - 행 클릭 핸들러

### FileDropzone
파일 업로드를 위한 드래그 앤 드롭 컴포넌트입니다.

```tsx
import FileDropzone from '@/components/common/FileDropzone';

<FileDropzone
  onDrop={handleDrop}
  accept={{
    'image/*': ['.png', '.jpg', '.jpeg'],
    'application/pdf': ['.pdf']
  }}
  maxSize={5 * 1024 * 1024}
/>
```

#### Props
- `onDrop`: function - 파일 드롭 핸들러
- `accept`: object - 허용할 파일 타입
- `maxSize`: number - 최대 파일 크기 (바이트)

### PageLayout
페이지 레이아웃 컴포넌트입니다.

```tsx
import PageLayout from '@/components/common/PageLayout';

<PageLayout
  title="매물 관리"
  actions={<Button>새 매물</Button>}
>
  <PropertyList />
</PageLayout>
```

#### Props
- `title`: string - 페이지 제목
- `actions`: ReactNode (선택) - 액션 버튼
- `children`: ReactNode - 페이지 내용
- `maxWidth`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (선택) - 최대 너비

### SearchPanel
검색 패널 컴포넌트입니다.

```tsx
import SearchPanel from '@/components/common/SearchPanel';

<SearchPanel
  onSearch={handleSearch}
  onFilterChange={handleFilterChange}
  filterFields={[
    {
      name: 'type',
      label: '매물 유형',
      type: 'select',
      options: [
        { value: 'sale', label: '매매' },
        { value: 'rent', label: '전세' }
      ]
    }
  ]}
/>
```

#### Props
- `onSearch`: function - 검색 핸들러
- `onFilterChange`: function (선택) - 필터 변경 핸들러
- `filterFields`: array (선택) - 필터 필드 정의

### StatsCard
통계 카드 컴포넌트입니다.

```tsx
import StatsCard from '@/components/common/StatsCard';

<StatsCard
  title="전체 매물"
  value="45"
  icon={<HomeIcon />}
  color="#1976d2"
  trend={{ value: 8, isPositive: true }}
/>
```

#### Props
- `title`: string - 카드 제목
- `value`: string | number - 표시할 값
- `icon`: ReactNode (선택) - 아이콘
- `color`: string (선택) - 아이콘 색상
- `trend`: object (선택) - 추세 정보
  - `value`: number - 변화율
  - `isPositive`: boolean - 증가 여부

### StatusBadge
상태 뱃지 컴포넌트입니다.

```tsx
import StatusBadge from '@/components/common/StatusBadge';

<StatusBadge
  status="success"
  label="완료"
/>
```

#### Props
- `status`: 'success' | 'error' | 'warning' | 'info' | 'default' - 상태
- `label`: string - 표시할 텍스트 