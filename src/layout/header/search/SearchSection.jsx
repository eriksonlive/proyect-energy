import {
  Box,
  Card,
  Grid2 as Grid,
  InputAdornment,
  OutlinedInput,
  Popper,
} from '@mui/material';
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import { useState } from 'react';
import { HeaderAvatar } from './HeaderAvatar';

import { IoSearchOutline } from 'react-icons/io5';

import { Transitions } from 'ui-component';
import { MobileSearch } from './MobileSearch';

export const SearchSection = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
                <HeaderAvatar {...bindToggle(popupState)}>
                  <IoSearchOutline size="1.3rem" />
                </HeaderAvatar>
              </Box>
              <Popper
                {...bindPopper(popupState)}
                transition
                sx={{
                  zIndex: 1100,
                  width: '99%',
                  top: '-55px !important',
                  px: { xs: 1.25, sm: 1.5 },
                }}
              >
                {({ TransitionProps }) => (
                  <>
                    <Transitions
                      type="zoom"
                      {...TransitionProps}
                      sx={{ transformOrigin: 'center left' }}
                    >
                      <Card
                        sx={{
                          bgcolor: 'background.default',
                          border: 0,
                          boxShadow: 'none',
                        }}
                      >
                        <Box sx={{ p: 2 }}>
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Grid>
                              <MobileSearch
                                value={value}
                                setValue={setValue}
                                popupState={popupState}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Transitions>
                  </>
                )}
              </Popper>
            </>
          )}
        </PopupState>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <OutlinedInput
          id="input-search-header"
          value={value}
          onChange={({ target }) => setValue(target.value)}
          placeholder="Buscar"
          startAdornment={
            <InputAdornment position="start">
              <IoSearchOutline size="1.3rem" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <HeaderAvatar>
                {/* <IconAdjustmentsHorizontal stroke={1.5} size="20px" /> */}
              </HeaderAvatar>
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{
            'aria-label': 'weigth',
            sx: { bgcolor: 'transparent', pl: 0.5 },
          }}
          sx={{ width: { md: 250, lg: 434 }, ml: 2, px: 2 }}
        />
      </Box>
    </>
  );
};
