import {gql, useQuery} from '@apollo/client';
import {Route, Routes} from 'react-router-dom';
import Spinner from '../components/spinner';
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

  if (!data || loading || error) {
    return <Spinner />;
  }

  switch (data.me?.role) {
    case UserRole.Client:
      return <Client />;
    default:
      return <div>Lo sentimos, ocurrió un error. Por favor, intentalo más tarde.</div>;
  }
}

export default LoggedInRouter;
