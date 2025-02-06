import { FaRegMoneyBillAlt, FaUsers } from 'react-icons/fa';
import { SlEnergy } from 'react-icons/sl';
import {
  PiCashRegisterFill,
  PiSunHorizonThin,
  PiProjectorScreenChartDuotone,
} from 'react-icons/pi';

// constant
const icons = {
  PiCashRegisterFill,
  FaRegMoneyBillAlt,
  FaUsers,
  PiSunHorizonThin,
  PiProjectorScreenChartDuotone,
  SlEnergy,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

export const comunidad = {
  id: 'comunidad',
  title: 'Comunidad',
  type: 'group',
  children: [
    {
      id: 'comunity',
      title: 'Comunidad',
      type: 'item',
      url: '/comunidad',
      icon: icons.FaUsers,
      breadcrumbs: true,
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
};
