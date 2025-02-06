import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from '@mui/material';

import { bindToggle } from 'material-ui-popup-state';

export const MobileSearch = ({ value, setValue, popupState }) => {
  const theme = useTheme();

  return (
    <OutlinedInput
      id="input-search-header"
      value={value}
      onChange={({ target }) => setValue(target.value)}
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">{/* lorem icon */}</InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          {/* <HeaderAvatar>
                    <IconAdjustmentsHorizontal stroke={1.5} size="20px" />
                </HeaderAvatar> */}
          <Box sx={{ ml: 2 }}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                bgColor: 'orange.ligth',
                color: 'orange.dark',
                '&:hover': {
                  bgColor: 'orange.dark',
                  color: 'orange.ligth',
                },
              }}
              {...bindToggle(popupState)}
            >
              {/* lorem icon */}
            </Avatar>
          </Box>
        </InputAdornment>
      }
      aria-describedby="search-helper-text"
      inputProps={{
        'aria-label': 'weight',
        sx: { bgColor: 'transparent', pl: 0.5 },
      }}
      sx={{ width: '100%', ml: 0.5, px: 2, bgcolor: 'background.paper' }}
    />
  );
};

MobileSearch.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};
