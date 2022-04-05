import {gql, useQuery} from '@apollo/client';
import {RESTAURANT_FRAGMENT} from '../../fragments';
import {myRestaurants} from '../../types/myRestaurants';

const MY_RESTAURANTS_QUERY = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

function MyRestaurants() {
  const {data} = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY);
  return <div></div>;
}

export default MyRestaurants;
