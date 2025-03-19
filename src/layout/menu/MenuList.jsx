import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { menuItems } from 'menu-items';
import { NavGroup } from './group';

export const MenuList = () => {
  const { t } = useTranslation();

  // Memorizar el menú para evitar renders innecesarios
  const navItems = useMemo(() => menuItems(t).items, [t]);

  return (
    <>
      {navItems.map((item) => {
        switch (item.type) {
          case 'group':
            return <NavGroup key={item.id} item={item} />;
          default:
            return (
              <Typography
                key={item.id}
                variant="h6"
                color="error"
                align="center"
              >
                {t('menuItemsError')}
              </Typography>
            );
        }
      })}
    </>
  );
};
