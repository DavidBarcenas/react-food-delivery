import {gql, useQuery} from '@apollo/client';
import {isLoggedInVar} from '../apollo';
import {meQuery} from '../types/meQuery';

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

  function onClick() {
    isLoggedInVar(false);
  }

  if (!data || loading || error) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.me?.role}</h1>
      <button onClick={onClick}>Click to logout</button>
    </div>
  );
}

export default LoggedInRouter;
