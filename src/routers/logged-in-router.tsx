import {gql, useQuery} from '@apollo/client';
import {Route, Routes} from 'react-router-dom';
import Spinner from '../components/spinner';
import ServerError from '../pages/server-error';
import {UserRole} from '../types/globalTypes';
import {meQuery} from '../types/meQuery';
import Restaurants from './clients/restaurants';

function Client() {
  return (
    <Routes>
      <Route path='/' element={<Restaurants />} />
      <Route path='*' element={<h1>Upps! 404</h1>} />
    </Routes>
  );
}

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      emailVerified
    }
  }
`;

function LoggedInRouter() {
  const {data, loading, error} = useQuery<meQuery>(ME_QUERY);
  console.log({error, loading, data});

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

  switch (data.me?.role) {
    case UserRole.Client:
      return <Client />;
    default:
      return <div>Lo sentimos, ocurrió un error. Por favor, intentalo más tarde.</div>;
  }
}

export default LoggedInRouter;
