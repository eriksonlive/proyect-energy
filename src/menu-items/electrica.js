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
  title: 'Wiki Energy',
  type: 'group',
  children: [
    {
      id: 'energias-renovables',
      title: 'Energías renovables',
      type: 'item',
      url: '/energias-renovables',
      icon: icons.MdAutorenew,
      breadcrumbs: false,
    },
    {
      id: 'valoracion-energia',
      title: 'Valoración de energía',
      type: 'item',
      url: '/valoracion-energia',
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
