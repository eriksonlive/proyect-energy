import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { forwardRef } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { FiberManualRecord } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const open = useSelector(({ custom }) => custom.open);
  const { pathname } = useLocation();
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecord sx={{}} fontSize={level > 0 ? "inherit" : "medium"} />
  );

  let itemTarget = "_self";

  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.url} target={itemTarget} />
    )),
  };

  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        mb: 0.5,
        alignItems: "flex-start",
        backgroundColor: level > 1 ? "transparent !important" : "inherit",
        py: open ? level > 1 ? 1 : 1.25 : null,
        pl: open ? `${level * 24}px`: null,
      }}
    >
      <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      {open && (
        <ListItemText
          primary={<Typography color="inherit">{item.title}</Typography>}
          secondary={
            <Typography
              variant="caption"
              sx={{ ...theme.typography.subMenuCaption }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          }
        />
      )}

      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};
