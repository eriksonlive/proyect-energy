/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

const themePalette = (theme) => {
  const { colors, mode } = theme;

  return {
    mode: mode,
    common: {
      black: colors.commonBlack,
      white: colors.commonWhite,
    },
    primary: {
      main: mode === 'light' ? colors.lightPrimaryMain : colors.darkPrimaryMain,
      light:
        mode === 'light' ? colors.lightPrimaryLight : colors.darkPrimaryLight,
      dark: mode === 'light' ? colors.lightPrimaryDark : colors.darkPrimaryDark,
      contrastText:
        mode === 'light'
          ? colors.lightPrimaryContrastText
          : colors.darkPrimaryContrastText,
    },
    secondary: {
      main:
        mode === 'light' ? colors.lightSecondaryMain : colors.darkSecondaryMain,
      light:
        mode === 'light'
          ? colors.lightSecondaryLight
          : colors.darkSecondaryLight,
      dark:
        mode === 'light' ? colors.lightSecondaryDark : colors.darkSecondaryDark,
      contrastText:
        mode === 'light'
          ? colors.lightSecondaryContrastText
          : colors.darkSecondaryContrastText,
    },
    error: {
      main: mode === 'light' ? colors.lightErrorMain : colors.darkErrorMain,
      light: mode === 'light' ? colors.lightErrorLight : colors.darkErrorLight,
      dark: mode === 'light' ? colors.lightErrorDark : colors.darkErrorDark,
      contrastText:
        mode === 'light'
          ? colors.lightErrorContrastText
          : colors.darkErrorContrastText,
    },
    warning: {
      main: mode === 'light' ? colors.lightWarningMain : colors.darkWarningMain,
      light:
        mode === 'light' ? colors.lightWarningLight : colors.darkWarningLight,
      dark: mode === 'light' ? colors.lightWarningDark : colors.darkWarningDark,
      contrastText:
        mode === 'light'
          ? colors.lightWarningContrastText
          : colors.darkWarningContrastText,
    },
    info: {
      main: mode === 'light' ? colors.lightInfoMain : colors.darkInfoMain,
      light: mode === 'light' ? colors.lightInfoLight : colors.darkInfoLight,
      dark: mode === 'light' ? colors.lightInfoDark : colors.darkInfoDark,
      contrastText:
        mode === 'light'
          ? colors.lightInfoContrastText
          : colors.darkInfoContrastText,
    },
    success: {
      main: mode === 'light' ? colors.lightSuccessMain : colors.darkSuccessMain,
      light:
        mode === 'light' ? colors.lightSuccessLight : colors.darkSuccessLight,
      dark: mode === 'light' ? colors.lightSuccessDark : colors.darkSuccessDark,
      contrastText:
        mode === 'light'
          ? colors.lightSuccessContrastText
          : colors.darkSuccessContrastText,
    },
    grey: {
      50: mode === 'light' ? colors.lightGrey50 : colors.darkGrey50,
      100: mode === 'light' ? colors.lightGrey100 : colors.darkGrey100,
      200: mode === 'light' ? colors.lightGrey200 : colors.darkGrey200,
      300: mode === 'light' ? colors.lightGrey300 : colors.darkGrey300,
      400: mode === 'light' ? colors.lightGrey400 : colors.darkGrey400,
      500: mode === 'light' ? colors.lightGrey500 : colors.darkGrey500,
      600: mode === 'light' ? colors.lightGrey600 : colors.darkGrey600,
      700: mode === 'light' ? colors.lightGrey700 : colors.darkGrey700,
      800: mode === 'light' ? colors.lightGrey800 : colors.darkGrey800,
      900: mode === 'light' ? colors.lightGrey900 : colors.darkGrey900,
      A100: mode === 'light' ? colors.lightGreyA100 : colors.darkGreyA100,
      A200: mode === 'light' ? colors.lightGreyA200 : colors.darkGreyA200,
      A400: mode === 'light' ? colors.lightGreyA400 : colors.darkGreyA400,
      A700: mode === 'light' ? colors.lightGreyA700 : colors.darkGreyA700,
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    text: {
      primary:
        mode === 'light' ? colors.lightTextPrimary : colors.darkTextPrimary,
      secondary:
        mode === 'light' ? colors.lightTextSecondary : colors.darkTextSecondary,
      disabled:
        mode === 'light' ? colors.lightTextDisabled : colors.darkTextDisabled,
      divider:
        mode === 'light' ? colors.lightTextDivider : colors.darkTextDivider,
    },
    background: {
      paper:
        mode === 'light'
          ? colors.lightBackgroundPaper
          : colors.darkBackgroundPaper,
      default:
        mode === 'light'
          ? colors.lightBackgroundDefault
          : colors.darkBackgroundDefault,
    },
    action: {
      active:
        mode === 'light' ? colors.lightActionActive : colors.darkActionActive,
      hover:
        mode === 'light' ? colors.lightActionHover : colors.darkActionHover,
      hoverOpacity: 0.04,
      selected:
        mode === 'light'
          ? colors.lightActionSelected
          : colors.darkActionSelected,
      selectedOpacity: 0.08,
      disabled:
        mode === 'light'
          ? colors.lightActionDisabled
          : colors.darkActionDisabled,
      disabledBackground:
        mode === 'light'
          ? colors.lightActionDisabledBackground
          : colors.darkActionDisabledBackground,
      disabledOpacity: 0.38,
      focus:
        mode === 'light' ? colors.lightActionFocus : colors.darkActionFocus,
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  };
};

export default themePalette;
