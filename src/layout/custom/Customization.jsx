import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Checkbox,
  Drawer,
  Fab,
  FormControl,
  FormControlLabel,
  Grid2 as Grid,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

import { BsGear } from 'react-icons/bs';

import PerfectScrollbar from 'react-perfect-scrollbar';

// import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from '../../store/actions';

import { AnimateButton, SubCard } from 'ui-component';
import { gridSpacing } from 'store/constan';
import {
  borderState,
  fontState,
  modeState,
} from 'store/slices/custom/customReducer';
import { useTranslation } from 'react-i18next';
import { ButtonMode } from 'components/buttons/ButtonMode';

const valueText = (value) => {
  return `${value}px`;
};

// ==============================|| LIVE CUSTOMIZATION ||============================== //

export const Customization = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.custom);
  const { t } = useTranslation();

  // drawer on/off
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  // state - border radius
  const [borderRadius, setBorderRadius] = useState(customization.borderRadius);
  const handleBorderRadius = (event, newValue) => {
    setBorderRadius(newValue);
  };

  const handleThemeMode = () => {
    dispatch(modeState(!customization.mode));
  };

  useEffect(() => {
    dispatch(borderState(borderRadius));
  }, [dispatch, borderRadius]);

  let initialFont;
  switch (customization.fontFamily) {
    case `'Inter', sans-serif`:
      initialFont = 'Inter';
      break;
    case `'Poppins', sans-serif`:
      initialFont = 'Poppins';
      break;
    case `'Roboto', sans-serif`:
    default:
      initialFont = 'Roboto';
      break;
  }

  // state - font family
  const [fontFamily, setFontFamily] = useState(initialFont);
  useEffect(() => {
    let newFont;
    switch (fontFamily) {
      case 'Inter':
        newFont = `'Inter', sans-serif`;
        break;
      case 'Poppins':
        newFont = `'Poppins', sans-serif`;
        break;
      case 'Roboto':
      default:
        newFont = `'Roboto', sans-serif`;
        break;
    }
    dispatch(fontState());
  }, [dispatch, fontFamily]);

  return (
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            top: '25%',
            position: 'fixed',
            right: 10,
            zIndex: theme.zIndex.speedDial,
          }}
        >
          <AnimateButton type="rotate">
            <IconButton color="inherit" size="large" disableRipple>
              <BsGear color="white" size={20} />
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280, // ✅ Se aplica correctamente al Paper interno
            maxWidth: 280,
          },
        }}
      >
        <PerfectScrollbar component="div">
          <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
            <Grid size={12}>
              <ButtonMode
                handleThemeMode={handleThemeMode}
                stateMode={customization.mode}
              />
            </Grid>

            <Grid size={12}>
              {/* font family */}
              <SubCard title={t('additional.fontFamily')}>
                <FormControl>
                  <RadioGroup
                    aria-label="font-family"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Roboto"
                      control={<Radio />}
                      label="Roboto"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                    <FormControlLabel
                      value="Poppins"
                      control={<Radio />}
                      label="Poppins"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                    <FormControlLabel
                      value="Inter"
                      control={<Radio />}
                      label="Inter"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </SubCard>
            </Grid>
            <Grid size={12}>
              {/* border radius */}
              <SubCard title={t('additional.borderRadius')}>
                <Grid
                  size={12}
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ mt: 2.5 }}
                >
                  <Grid size={1}>
                    <Typography variant="h6" color="secondary">
                      4px
                    </Typography>
                  </Grid>
                  <Grid size={9}>
                    <Slider
                      size="small"
                      value={borderRadius}
                      onChange={handleBorderRadius}
                      getAriaValueText={valueText}
                      valueLabelDisplay="on"
                      aria-labelledby="discrete-slider-small-steps"
                      marks
                      step={2}
                      min={4}
                      max={24}
                      color="secondary"
                      sx={{
                        '& .MuiSlider-valueLabel': {
                          color: 'secondary.light',
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={1}>
                    <Typography variant="h6" color="secondary">
                      24px
                    </Typography>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </Drawer>
    </>
  );
};
