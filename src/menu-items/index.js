import { dashboard } from './dashboard';
import { pages } from './pages';
// import { utilities } from './utilities';
import { monitoreo } from './monitoreo';
import { prediccion } from './prediccion';
import { energia } from './electrica';
import { comunidad } from './comunidad';

export const menuItems = (t) => ({
  items: [
    dashboard(t),
    monitoreo(t),
    prediccion(t),
    energia(t),
    comunidad(t),
    pages(t),
  ],
});
