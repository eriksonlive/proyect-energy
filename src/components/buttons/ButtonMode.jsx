import { Box } from '@mui/material';
import SunIcon from '/src/assets/img/sun.svg?react';
import MoonIcon from '/src/assets/img/moon.svg?react';

export const ButtonMode = ({ handleThemeMode, stateMode }) => {
  return (
    <>
      <Box
        component="input"
        type="checkbox"
        id="mode-toggle"
        name="mode"
        value="light"
        checked={stateMode}
        onChange={handleThemeMode}
        sx={{
          width: 0,
          height: 0,
          visibility: 'hidden',
          '&:checked + label:after': {
            left: 'calc(100% - 3px)',
            transform: 'translateX(-100%)',
            background: 'linear-gradient(0deg, #777, #3a3a3a)',
          },
        }}
      />
      <Box
        component="label"
        htmlFor="mode-toggle"
        data-custom="true"
        sx={{
          width: '90px',
          height: '40px',
          position: 'relative',
          display: 'block',
          borderRadius: '200px',
          background: stateMode ? '#242424' : '#ebebeb',
          boxShadow:
            'inset 0 5px 15px rgba(0, 0, 0, 0.1), inset 0 -5px 15px rgba(255, 255, 255, 0.1)',
          cursor: 'pointer',
          transition: '0.3s',
          '&:after': {
            content: '""',
            width: '35px',
            height: '35px',
            position: 'absolute',
            top: '3px',
            left: '3px',
            background:
              'linear-gradient(180deg,rgb(255, 255, 255), rgb(187, 187, 187))',
            borderRadius: '180px',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
            transition: '0.3s',
          },
          '&:active:after': {
            width: '50px',
          },
        }}
      >
        <SunIcon
          className="sun"
          width="25"
          height="25"
          fill="#fff"
          style={{
            position: 'absolute',
            top: '50%',
            left: '8px',
            transform: 'translateY(-50%)',
            zIndex: 50,
            transition: '0.3s',
            opacity: stateMode ? 0 : 1,
          }}
        />
        <MoonIcon
          className="moon"
          width="20"
          height="20"
          fill="#fff"
          style={{
            position: 'absolute',
            top: '51%',
            right: '10px', // Lo colocamos a la derecha
            transform: 'translateY(-50%)',
            zIndex: 50,
            transition: '0.3s',
            opacity: stateMode ? 1 : 0,
          }}
        />
      </Box>
    </>
  );
};
