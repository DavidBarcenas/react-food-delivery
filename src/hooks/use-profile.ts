import {gql, useQuery} from '@apollo/client';
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

export function useProfile() {
  return useQuery<meQuery>(ME_QUERY);
}
