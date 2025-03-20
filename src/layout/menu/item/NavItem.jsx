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
import { forwardRef, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { FiberManualRecord } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectedMenu } from 'store/slices/custom/customReducer';

export const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const customization = useSelector(({ custom }) => custom);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detecta si es móvil

  // Ajustar el estado de apertura según el tamaño de la pantalla
  const shouldOpen = isMobile ? true : customization.open;

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecord
      sx={{
        width:
          customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height:
          customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.url} target={itemTarget} />
    )),
  };

  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch(selectedMenu(item.id));
    }
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: shouldOpen ? (level > 1 ? 1 : 1.25) : null,
        pl: shouldOpen ? `${level * 24}px` : null,
      }}
      selected={
        (customization.isOpen || []).findIndex((id) => id === item.id) > -1
      }
    >
      <ListItemIcon
        sx={{
          my: 'auto',
          minWidth: !item?.icon ? 18 : 36,
          color:
            (customization.isOpen || []).findIndex((id) => id === item.id) > -1
              ? 'primary.main'
              : 'inherit',
        }}
      >
        {itemIcon}
      </ListItemIcon>
      {shouldOpen && (
        <ListItemText
          primary={
            <Typography
              variant={
                (customization.isOpen || []).findIndex((id) => id == item.id) >
                -1
                  ? 'h5'
                  : 'body1'
              }
              color={
                (customization.isOpen || []).findIndex((id) => id === item.id) >
                -1
                  ? 'primary.main'
                  : 'inherit'
              }
              sx={{
                mt: 0.7,
              }}
            >
              {item.title}
            </Typography>
          }
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
