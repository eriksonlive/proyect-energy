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

import { drawerWidth } from 'store/constan';
import { Main } from './mainStyled';

export const MainLayout = () => {
  const theme = useTheme();
  const leftDrawerOpenend = useSelector(({ custom }) => custom.open);
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  const handleLeftDrawerToogle = () => {
    dispatch(isOpenMenu());
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpenend
            ? theme.transitions.create('width')
            : 'none',
        }}
      >
        <Toolbar>
          <HeaderIndex handleLeftDrawerToggle={handleLeftDrawerToogle} />
        </Toolbar>
      </AppBar>

      <SideMenu
        drawerOpen={!matchDownMd ? leftDrawerOpenend : !leftDrawerOpenend}
        drawerToggle={handleLeftDrawerToogle}
      />
      <Main theme={theme} open={leftDrawerOpenend} drawerWidth={drawerWidth}>
        {/* lorem icon */}
        <Breadcrumbs navigation={''} separator={'icono'} />
        <Outlet />
      </Main>
      <Customization />
    </Box>
  );
};
