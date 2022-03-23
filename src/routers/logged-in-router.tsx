import {gql, useQuery} from '@apollo/client';
import {Route, Routes} from 'react-router-dom';
import Header from '../components/header';
import Spinner from '../components/spinner';
import ServerError from '../pages/server-error';
import {UserRole} from '../types/globalTypes';
import {meQuery} from '../types/meQuery';
import Restaurants from './clients/restaurants';

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

  return (
    <>
      <Header />
      <Routes>
        {data.me?.role === UserRole.Client && <Route path='/' element={<Restaurants />} />}
      </Routes>
    </>
  );
}

export default LoggedInRouter;
