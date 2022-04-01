import {useRoutes} from 'react-router-dom';
import Header from '../components/header';
import Spinner from '../components/spinner';
import {useProfile} from '../hooks/use-profile';
import Error from '../pages/error';
import {routes} from './routes';

function LoggedInRouter() {
  const {data, loading, error} = useProfile();
  const router = useRoutes(routes(data?.me?.role));

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
      <div className='mx-auto w-full'>{router}</div>
    </>
  );
}

export default LoggedInRouter;
