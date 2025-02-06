import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

export const CustomOutlinedInput = ({
  id,
  name,
  label,
  onBlur,
  onChange,
  value,
  type,
  error,
  ...props
}) => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordView = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <FormControl
      fullWidth
      sx={{
        ...theme.typography.customInput,
      }}
      error={!!error}
    >
      <InputLabel htmlFor={id} sx={{ color: `${error && "red"}` }}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type={type === "password" && !showPassword ? "password" : "textfield"}
        value={value}
        name={name}
        label={label}
        onBlur={onBlur}
        onChange={onChange}
        endAdornment={
          type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handlePasswordView}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }
        inputProps={{}}
        {...props}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};
