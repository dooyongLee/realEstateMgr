import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from '@mui/material';
import {
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  People as PeopleIcon,
  Forum as ForumIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  drawerWidth: number;
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ drawerWidth, open, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: '홈', icon: <HomeIcon />, path: '/' },
    { text: '매물 관리', icon: <ApartmentIcon />, path: '/properties' },
    { text: '계약 관리', icon: <AssignmentIcon />, path: '/contracts' },
    { text: '고객 관리', icon: <PeopleIcon />, path: '/customers' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/admin')}>
            <ListItemIcon>
              <AdminIcon />
            </ListItemIcon>
            <ListItemText primary="관리자" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* 모바일용 임시 드로어 */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {/* 데스크톱용 영구 드로어 */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;