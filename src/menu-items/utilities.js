// assets
import { PiCashRegisterFill } from 'react-icons/pi';
import { FaRegMoneyBillAlt, FaUsers } from 'react-icons/fa';

// constant
const icons = {
  PiCashRegisterFill,
  FaRegMoneyBillAlt,
  FaUsers,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

export const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'invoice',
      title: 'Facturación',
      type: 'item',
      url: '/invoice',
      icon: icons.PiCashRegisterFill,
      breadcrumbs: false,
    },
    {
      id: 'simple-invoice',
      title: 'Facturacion simple',
      type: 'item',
      url: '/simple-invoice',
      icon: icons.FaRegMoneyBillAlt,
      breadcrumbs: false,
    },
    {
      id: 'util-shadow',
      title: 'Clientes',
      type: 'item',
      url: '/customers',
      icon: icons.FaUsers,
      breadcrumbs: false,
    },
  ],
};
