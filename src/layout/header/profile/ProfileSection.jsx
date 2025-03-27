import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid2 as Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  Popper,
  Stack,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { MainCard, Transitions } from 'ui-component';

import { BsGearFill } from 'react-icons/bs';
import { IoSearchOutline, IoLogOutOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { LuSettings2 } from 'react-icons/lu';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from 'store/slices/auth/authSlice';
import { useTranslation } from 'react-i18next';

export const ProfileSection = () => {
  const theme = useTheme();
  const anchorRef = useRef(null);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const customization = useSelector((state) => state.custom);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [sdm, setSdm] = useState(true);
  const [notification, setNotification] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { nombre, email, photo } = useSelector(selectUser);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main} !important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light,
            },
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={photo ?? null}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        // lorem icon
        label={<BsGearFill size="25" />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 14],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2, pb: 0 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">{t('welcome')}</Typography>
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ fontWeight: 400 }}
                        >
                          {nombre}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">{email}</Typography>
                    </Stack>
                    <OutlinedInput
                      sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                      id="input-search-profile"
                      value={value}
                      onChange={({ target }) => setValue(target.value)}
                      placeholder={t('profile.search')}
                      startAdornment={
                        <InputAdornment position="start">
                          <IoSearchOutline
                            size="1.3rem"
                            color={theme.palette.grey[500]}
                          />
                        </InputAdornment>
                      }
                      aria-describedby="search-helper-text"
                      inputProps={{
                        'aria-label': 'weigth',
                      }}
                    />
                    <Divider />
                  </Box>
                  <PerfectScrollbar
                    style={{
                      height: '100%',
                      maxHeight: 'calc(100hv - 250px)',
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Card
                        sx={{ bgcolor: theme.palette.primary.light, my: 2 }}
                      >
                        <CardContent>
                          <Grid container spacing={3} direction="column">
                            <Grid>
                              <Grid
                                container
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid>
                                  <Typography variant="subtitle1">
                                    {t('profile.startModeDnd')}
                                  </Typography>
                                </Grid>
                                <Grid>
                                  <Switch
                                    color="primary"
                                    checked={sdm}
                                    onChange={({ target }) =>
                                      setSdm(target.checked)
                                    }
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid>
                              <Grid
                                container
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid>
                                  <Typography variant="subtitle1">
                                    {t('profile.allowNotifications')}
                                  </Typography>
                                </Grid>
                                <Grid>
                                  <Switch
                                    checked={notification}
                                    onChange={({ target }) =>
                                      setNotification(target.checked)
                                    }
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      <Divider />
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.background,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%',
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5,
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 0}
                          onClick={(event) =>
                            handleListItemClick(event, 0, '#')
                          }
                        >
                          <ListItemIcon>
                            <LuSettings2 size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                {t('profile.accountSetup')}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 1}
                          onClick={(event) =>
                            handleListItemClick(event, 1, '#')
                          }
                        >
                          <ListItemIcon>
                            {<CgProfile size="1.3rem" />}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid>
                                  <Typography variant="body2">
                                    {t('profile.socialProfile')}
                                  </Typography>
                                </Grid>
                                <Grid>
                                  <Chip
                                    label="02"
                                    size="small"
                                    sx={{
                                      bgcolor: theme.palette.warning.dark,
                                      color: theme.palette.background.default,
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 4}
                          onClick={
                            () => dispatch(logout())
                            // handleListItemClick(event, 0, '/login')
                          }
                        >
                          <ListItemIcon>
                            {<IoLogOutOutline size="1.3rem" />}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                {t('profile.logout')}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};
