import { Home } from "../pages/Home";
import NewReceiverPage from "../pages/NewReceiverPage";

export const routes = [
  { path: '/receiver', element: Home },
  { path: '/receiver/new-receiver', element: NewReceiverPage},
  // { path: '/ra_router_menu/timeattack', element: TimeAttackPage },
  // { path: '/ra_router_menu/forza', element: ForzaPage },
]