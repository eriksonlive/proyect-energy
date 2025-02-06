import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { SideMenu } from './menu';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isOpenMenu } from 'store/slices/custom/customReducer';
import { HeaderIndex } from './header';
import { Customization } from './custom';
import { Breadcrumbs } from 'ui-component';
import styled from '@emotion/styled';
import { drawerWidth } from 'store/constan';

const Main = styled('main', {
  shouldForwardProp: (prop) =>
    prop !== 'open' && prop !== 'theme' && prop !== 'drawerWidth',
})(({ theme, open, drawerWidth }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 65), // controla el tamaño del sidebar frente al contenido
    width: `calc(100% - ${drawerWidth}px)`,
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    marginRight: '10px',
  },
}));

export const Layout = ({ children }) => {
  const theme = useTheme();
  const open = useSelector(({ custom }) => custom.open);
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  const drawerToggle = () => {
    dispatch(isOpenMenu());
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        sx={{
          bgcolor: theme.palette.background.default,
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <HeaderIndex handleLeftDrawerToggle={drawerToggle} />
        </Toolbar>
      </AppBar>

      <SideMenu
        drawerOpen={!matchDownMd ? open : !open}
        drawerToggle={drawerToggle}
      />
      <Main theme={theme} open={open} drawerWidth={drawerWidth}>
        {/* lorem icon */}
        <Breadcrumbs navigation={''} separator={'icono'} />
        <Outlet />
      </Main>
      <Customization />
    </Box>
  );
};
