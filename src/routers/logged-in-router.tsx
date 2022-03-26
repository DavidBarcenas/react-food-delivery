import {useRoutes} from 'react-router-dom';
import Header from '../components/header';
import Spinner from '../components/spinner';
import {useProfile} from '../hooks/use-profile';
import NotFound from '../pages/not-found';
import {UserRole} from '../types/globalTypes';
import Restaurants from '../pages/clients/restaurants';
import ConfirmEmail from '../pages/user/confirm-email';
import Error from '../pages/error';
import EditProfile from '../pages/user/edit-profile';
import Search from '../pages/clients/search';

const CLIENT_ROUTES = [
  {path: '/', element: <Restaurants />},
  {path: '/edit-profile', element: <EditProfile />},
  {path: '/confirm', element: <ConfirmEmail />},
  {path: '/search', element: <Search />},
  {path: '*', element: <NotFound />},
];

function LoggedInRouter() {
  const {data, loading, error} = useProfile();
  const routes = useRoutes(CLIENT_ROUTES);

  if (!!error) {
    return <Error />;
  }

  if (!data || loading) {
    return (
      <div className='main-container justify-center text-xl'>
        <Spinner className='text-lime-500' size='large' />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='mx-auto w-full'>{data.me?.role === UserRole.Client && routes}</div>
    </>
  );
}

export default LoggedInRouter;
