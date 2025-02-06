import PropTypes from 'prop-types';
import { Avatar, useTheme } from '@mui/material';
import { forwardRef } from 'react';

export const HeaderAvatar = forwardRef(({ children, ...others }, ref) => {
  const theme = useTheme();

  return (
    <Avatar
      ref={ref}
      variant="rounded"
      sx={{
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        bgColor: "secondary.ligth",
        color: "secondary.dark",
        "&:hover": {
          bgColor: "secondary.dark",
          color: "secondary.ligth",
        },
      }}
      {...others}
    >
      {children}
    </Avatar>
  );
});

HeaderAvatar.propTypes = {
  children: PropTypes.node,
};
