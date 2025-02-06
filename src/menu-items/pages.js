import { IoKeyOutline } from 'react-icons/io5';
import { SlLogin } from 'react-icons/sl';
import { FaRegRegistered } from 'react-icons/fa';

// constant
const icons = {
  IoKeyOutline,
  SlLogin,
  FaRegRegistered,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

export const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IoKeyOutline,

      children: [
        {
          id: 'login',
          title: 'Login',
          type: 'item',
          url: '/login',
          // target: true,
          icon: icons.SlLogin,
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/register',
          // target: true,
          icon: icons.FaRegRegistered,
        },
      ],
    },
  ],
};
