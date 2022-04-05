import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {RESTAURANT_FRAGMENT} from '../../fragments';
import {myRestaurant, myRestaurantVariables} from '../../types/myRestaurant';

const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

function MyRestaurant() {
  const {id} = useParams();
  const {data} = useQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUERY, {
    variables: {
      input: {
        id: Number(id),
      },
    },
  });
  console.log(data);
  return <div>MyRestaurant</div>;
}

export default MyRestaurant;
