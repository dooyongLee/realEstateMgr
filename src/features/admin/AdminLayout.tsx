import { Box, Tabs, Tab } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: '대시보드', path: '/admin' },
    { text: '공인중개사 관리', path: '/admin/realtors' },
  ];

  const currentTab = menuItems.findIndex(item => item.path === location.pathname);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(menuItems[newValue].path);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          {menuItems.map((item) => (
            <Tab key={item.path} label={item.text} />
          ))}
        </Tabs>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
