import { VscDashboard } from 'react-icons/vsc';

const icons = { VscDashboard };

export const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: '',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.VscDashboard,
      breadcrumbs: false,
    },
  ],
};
