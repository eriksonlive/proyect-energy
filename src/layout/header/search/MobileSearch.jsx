import {
  Avatar,
  Box,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from '@mui/material';

import { bindToggle } from 'material-ui-popup-state';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { HeaderAvatar } from '.';
import { IoCloseOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

export const MobileSearch = ({ value, setValue, popupState }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <OutlinedInput
      id="input-search-header"
      value={value}
      onChange={({ target }) => setValue(target.value)}
      placeholder={t('search')}
      startAdornment={
        <InputAdornment position="start">
          <IoSearchOutline size="1.3rem" />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <HeaderAvatar>
            <HiOutlineAdjustmentsHorizontal size="20px" />
          </HeaderAvatar>
          <Box sx={{ ml: 2 }}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                bgColor: 'warning.ligth',
                color: 'warning.dark',
                '&:hover': {
                  bgColor: 'warning.dark',
                  color: 'warning.ligth',
                },
              }}
              {...bindToggle(popupState)}
            >
              <IoCloseOutline size="1.3rem" />
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
