import { Avatar, Box, ButtonBase, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SearchSection } from './search';
import { LogoSection } from '../logo';
import { NotificationSection } from './notification';
import { ProfileSection } from './profile';

export const HeaderIndex = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: "8px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <MenuIcon stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
      <SearchSection />

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      <NotificationSection />
      <ProfileSection />
    </>
  );
};
