import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {RESTAURANT_FRAGMENT} from '../../fragments';
import {restaurant, restaurantVariables} from '../../types/restaurant';

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        menu
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

function Restaurant() {
  const params = useParams<{id: string}>();
  const {data, loading} = useQuery<restaurant, restaurantVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: Number(params.id),
      },
    },
  });
  return <div>Restaurant</div>;
}

export default Restaurant;
