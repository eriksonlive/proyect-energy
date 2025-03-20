import PropTypes from 'prop-types';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { NavItem } from '../item';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

export const NavCollapse = ({ menu, level }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.custom);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detecta si es móvil

  // Asegurar que `openMenu` sea `true` en móvil para evitar errores
  const openMenu = isMobile ? true : customization.open;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
    if (menu?.id !== 'authentication') {
      navigate(menu.children[0]?.url);
    }
  };

  const { pathname } = useLocation();
  const checkOpenForParent = (child, id) => {
    child.forEach((item) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  useEffect(() => {
    setOpen(false);
    setSelected(null);
    if (menu.children) {
      menu.children.forEach((item) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id);
        }
        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }
  }, [pathname, menu.children]);

  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon
      strokeWidth={1.5}
      size="1.3rem"
      style={{ marginTop: 'auto', marginBottom: 'auto' }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: `${customization.borderRadius}px`,
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: openMenu ? `${level * 24}px` : 'none',
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{
            my: 'auto',
            minWidth: !menu.icon ? 18 : 36,
            color: selected ? 'primary.main' : '',
          }}
        >
          {menuIcon}
        </ListItemIcon>

        {openMenu && (
          <>
            <ListItemText
              primary={
                <Typography
                  variant={selected === menu.id ? 'h5' : 'body1'}
                  color={selected ? 'primary.main' : 'grey500'}
                  sx={{ my: 'auto' }}
                >
                  {menu.title}
                </Typography>
              }
              secondary={
                menu.caption && (
                  <Typography
                    variant="caption"
                    sx={{ ...theme.typography.subMenuCaption }}
                    display="block"
                    gutterBottom
                  >
                    {menu.caption}
                  </Typography>
                )
              }
            />
            {open ? (
              <Box sx={{ mt: 0.7 }}>
                <FaChevronUp />
              </Box>
            ) : (
              <Box sx={{ mt: 0.7 }}>
                <FaChevronDown />
              </Box>
            )}
          </>
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {openMenu ? (
          <List
            component="div"
            disablePadding
            sx={{
              position: 'relative',
              '&:after': {
                content: "''",
                position: 'absolute',
                left: '32px',
                top: 0,
                height: '100%',
                width: '1px',
                opacity: 1,
                background: theme.palette.primary.light,
              },
            }}
          >
            {menus}
          </List>
        ) : (
          <>{menus}</>
        )}
      </Collapse>
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
};
