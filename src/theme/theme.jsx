import { createTheme } from '@mui/material';
import { themeTypography } from './typography';
import themePalette from './palette';

import colors from '../assets/scss/_themes-vars.module.scss';
import { componentStyleOverrides } from './compStyleOverride';

export const theme = (customization) => {
  const color = colors;

  const isDark = false;

  const themeOption = {
    mode: isDark ? 'dark' : 'light',
    colors: color,
    background: isDark
      ? color.darkBackgroundDefault
      : color.lightBackgroundDefault,
    paper: isDark ? color.darkBackgroundPaper : color.lightBackgroundPaper,
    customization,
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions);
  themes.components = { ...componentStyleOverrides(themeOption) };

  return themes;
};
