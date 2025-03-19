import { VscDashboard } from 'react-icons/vsc';

const icons = { VscDashboard };

export const dashboard = (t) => ({
  id: 'dash',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: t('dashboard.title'),
      type: 'item',
      url: '/dashboard',
      icon: icons.VscDashboard,
      breadcrumbs: false,
    },
  ],
});
