import { FaRegMoneyBillAlt, FaUsers } from 'react-icons/fa';
import { SlEnergy } from 'react-icons/sl';
import { MdAutorenew } from 'react-icons/md';
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
  MdAutorenew,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

export const energia = {
  id: 'wiki-energia',
  title: 'Wiki Energía',
  type: 'group',
  children: [
    {
      id: 'energias-renovables',
      title: 'Energías renovables',
      type: 'item',
      url: '/red-electrica',
      icon: icons.MdAutorenew,
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
