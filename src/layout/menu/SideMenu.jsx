import { BrowserView, MobileView } from 'react-device-detect';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Chip,
  Stack,
  useMediaQuery,
  useTheme,
  styled,
} from '@mui/material';
import { MenuList } from './MenuList';
import { drawerWidth } from 'store/constan';
import MuiDrawer from '@mui/material/Drawer';
import { LogoSection } from 'layout/logo';

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: 'hidden',
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRight: 'none',
  [theme.breakpoints.up('md')]: {
    top: '88px',
  },
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: 'hidden',
  width: drawerWidth,
  border: 'none',
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
    top: '88px',
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  '& .MuiPaper-root': {
    visibility: 'visible !important',
    transform: 'translateX(0px) !important',
  },
}));

export const SideMenu = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mx: 'auto',
            my: 2,
          }}
        >
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 90px)' : 'calc(100vh - 88px)',
            paddingLeft: drawerOpen ? '16px' : '2px',
            paddingRight: drawerOpen ? '16px' : '2px',
          }}
        >
          <MenuList />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip
              label={'lorem'}
              disabled
              chipcolor="secondary"
              size="small"
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip
              label={'example'}
              disabled
              chipcolor="secondary"
              size="small"
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
      aria-label="mailbox folders"
    >
      {matchUpMd ? (
        <>
          <Drawer
            container={container}
            variant={matchUpMd ? 'persistent' : 'temporary'}
            anchor="left"
            open={drawerOpen}
          >
            {drawer}
          </Drawer>
        </>
      ) : (
        <>
          <MuiDrawer
            container={container}
            variant={matchUpMd ? 'persistent' : 'temporary'}
            anchor="left"
            open={drawerOpen}
            onClose={drawerToggle}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                background: theme.palette.background,
                color: theme.palette.text.primary,
                borderRight: 'none',
                [theme.breakpoints.up('md')]: {
                  top: '88px',
                },
              },
            }}
            ModalProps={{ keepMounted: true }}
            color="inherit"
          >
            {drawer}
          </MuiDrawer>
        </>
      )}
    </Box>
  );
};
