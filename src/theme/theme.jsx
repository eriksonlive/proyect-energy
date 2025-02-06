import { createTheme } from '@mui/material';
import { themeTypography } from './typography';
import themePalette from './palette';

import colors from '../assets/scss/_themes-vars.module.scss';
import { componentStyleOverrides } from './compStyleOverride';

export const theme = (customization) => {
  const color = colors;

  const isDark = false;

  const themeOption = {
    mode: isDark ? 'dark': 'light',
    colors: color,
    primary: isDark? color.primaryDark : color.primaryLight,
    heading: isDark ? color.grey100 : color.grey900,
    paper: isDark ? color.darkPaper : color.paper,
    backgroundDefault: isDark ? color.darkPaper : color.background,
    background: isDark ? color.darkBackground : color.primaryLight,
    darkTextPrimary: isDark ? color.grey300 : color.grey700,
    darkTextSecondary: isDark ? color.grey500 : color.grey500,
    textDark: isDark ? color.grey100 : color.grey900,
    menuSelected: isDark ? color.secondaryLight : color.secondaryDark,
    menuSelectedBack: isDark ? color.secondaryDark : color.secondaryLight,
    divider: isDark ? color.grey700 : color.grey200,
    customization
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;

}