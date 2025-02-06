import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CardActions,
  Chip,
  ClickAwayListener,
  Divider,
  Grid2 as Grid,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRef, useState } from 'react';
import { Transitions } from 'ui-component';
import { MainCard } from 'ui-component';
import { Link } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { NotificationList } from './NotificationList';

export const NotificationSection = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ ml: 2, mr: 3, [theme.breakpoints.down('md')]: { mr: 2 } }}>
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"], &:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            {/* lorem icon */}
          </Avatar>
        </ButtonBase>
      </Box>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [matchesXs ? 5 : 0, 20],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Transitions
            position={matchesXs ? 'top' : 'top-right'}
            in={open}
            {...TransitionProps}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => {}}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Grid container direction="column" spacing={2}>
                    <Grid size={12}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ pt: 2, px: 2 }}
                      >
                        <Grid>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="subtitle1">
                              Notificaciones
                            </Typography>
                            <Chip
                              size="small"
                              label="01"
                              sx={{
                                color: theme.palette.background.default,
                                bgcolor: theme.palette.warning.dark,
                              }}
                            />
                          </Stack>
                        </Grid>
                        <Grid>
                          <Typography
                            component={Link}
                            to="#"
                            variant="subtitle2"
                            color="primary"
                          >
                            Mark as all read
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid size={12}>
                      <PerfectScrollbar
                        component="div"
                        style={{
                          height: '100%',
                          maxHeight: 'calc(100vh - 205px)',
                          overflowX: 'hidden',
                        }}
                      >
                        <Grid container direction="column" spacing={2}>
                          <Grid size={12}>
                            <Box sx={{ px: 2, pt: 0.25 }}>
                              <TextField
                                id="outlined-select-currency-native"
                                select
                                fullWidth
                                value={''}
                                onChange={() => {}}
                                SelectProps={{
                                  native: true,
                                }}
                              >
                                <option key={0} value="lorem">
                                  Seleccione una opción
                                </option>
                                <option key={1} value="lorem">
                                  Lorem
                                </option>
                              </TextField>
                            </Box>
                          </Grid>
                          <Grid size={12} p={0}>
                            <Divider sx={{ my: 0 }} />
                          </Grid>
                        </Grid>
                        <NotificationList />
                      </PerfectScrollbar>
                    </Grid>
                  </Grid>
                  <Divider />
                  <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                    <Button size="small" disableElevation>
                      View All
                    </Button>
                  </CardActions>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};
