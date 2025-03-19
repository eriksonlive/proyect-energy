// assets
import { FaRegMoneyBillAlt, FaUsers } from 'react-icons/fa';
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
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

export const prediccion = (t) => ({
  id: 'prediccion',
  title: 'Prediccion',
  type: 'group',
  children: [
    {
      id: 'prediccion-energia-solar',
      title: 'Prediccion Energia solar',
      type: 'item',
      url: '/prediccion-energia-solar',
      icon: icons.PiProjectorScreenChartDuotone,
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
