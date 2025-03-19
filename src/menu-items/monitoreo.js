// assets
import { PiCashRegisterFill } from 'react-icons/pi';
import { FaRegMoneyBillAlt, FaUsers } from 'react-icons/fa';
import { PiSunHorizonThin } from 'react-icons/pi';

// constant
const icons = {
  PiCashRegisterFill,
  FaRegMoneyBillAlt,
  FaUsers,
  PiSunHorizonThin,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

export const monitoreo = (t) => ({
  id: 'monitoreo',
  title: 'Monitoreo',
  type: 'group',
  children: [
    {
      id: 'energia-solar',
      title: 'Energia solar',
      type: 'item',
      url: '/energia-solar',
      icon: icons.PiSunHorizonThin,
      breadcrumbs: false,
    },
    // {
    //   id: 'simple-invoice',
    //   title: 'Facturacion simple',
    //   type: 'item',
    //   url: '/simple-invoice',
    //   icon: icons.FaRegMoneyBillAlt,
    //   breadcrumbs: false,
    // },
    // {
    //   id: 'util-shadow',
    //   title: 'Clientes',
    //   type: 'item',
    //   url: '/customers',
    //   icon: icons.FaUsers,
    //   breadcrumbs: false,
    // },
  ],
});
