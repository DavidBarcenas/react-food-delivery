import {useRoutes} from 'react-router-dom';
import Header from '../components/header';
import Spinner from '../components/spinner';
import {useProfile} from '../hooks/use-profile';
import ServerError from '../pages/server-error';
import {UserRole} from '../types/globalTypes';
import Restaurants from './clients/restaurants';

const CLIENT_ROUTES = [
  {path: '/', element: <Restaurants />},
  {path: '/my-profile', element: <h1>Mi Perfil</h1>},
];

function LoggedInRouter() {
  const {data, loading, error} = useProfile();
  const routes = useRoutes(CLIENT_ROUTES);

  if (!!error) {
    return <ServerError />;
  }

  if (!data || loading) {
    return (
      <div className='flex h-screen items-center justify-center text-xl'>
        <Spinner className='text-lime-500' size='large' />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='mx-auto w-full px-10'>{data.me?.role === UserRole.Client && routes}</div>
    </>
  );
}

export default LoggedInRouter;
