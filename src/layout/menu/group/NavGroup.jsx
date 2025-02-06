import { Box, List, Typography, useTheme } from '@mui/material';
import { NavItem } from '../item';
import { NavCollapse } from '../collapse';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';

export const NavGroup = ({ item }) => {
  const theme = useTheme();
  const open = useSelector(({custom}) => custom.open);

  const items = item.children?.map((menu) => {

    switch (menu.type) {
      case "collapse":
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case "item":
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items error
          </Typography>
        );
    }
  });

  return (
    <>
      { open ? (
        <>
          <List
        subheader={
          item.title && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.menuCaption }}
              display="block"
              gutterBottom
            >
              {item.title}
              {item.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...theme.typography.subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </>
      ): (
        <Box sx={{ alingItems: 'center', ml: '5px' }}>
          {items}
          <Divider sx={{ mt: 0.25, mb: 1.25, width: '50px' }} />
        </Box>
      )}
    </>
  );
};
