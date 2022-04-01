import Category from '../pages/clients/category';
import Restaurant from '../pages/clients/restaurant';
import Restaurants from '../pages/clients/restaurants';
import Search from '../pages/clients/search';
import NotFound from '../pages/not-found';
import MyRestaurants from '../pages/owner/my-restaurants';
import ConfirmEmail from '../pages/user/confirm-email';
import EditProfile from '../pages/user/edit-profile';
import {UserRole} from '../types/globalTypes';

const COMMON_ROUTES = [
  {path: '/edit-profile', element: <EditProfile />},
  {path: '/confirm', element: <ConfirmEmail />},
  {path: '*', element: <NotFound />},
];

const CLIENT_ROUTES = [
  {path: '/', element: <Restaurants />},
  {path: '/search', element: <Search />},
  {path: '/category/:slug', element: <Category />},
  {path: '/restaurant/:id', element: <Restaurant />},
];

const OWNER_ROUTES = [{path: '/', element: <MyRestaurants />}];

export function routes(role: string | undefined) {
  let showRoutes = COMMON_ROUTES;

  if (role === UserRole.Client) {
    showRoutes = showRoutes.concat(CLIENT_ROUTES);
  }
  if (role === UserRole.Owner) {
    showRoutes = showRoutes.concat(OWNER_ROUTES);
  }
  return showRoutes;
}
