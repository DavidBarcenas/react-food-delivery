import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import Spinner from '../../components/spinner';
import Title from '../../components/title';
import {RESTAURANT_FRAGMENT} from '../../fragments';
import {restaurant, restaurantVariables} from '../../types/restaurant';

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
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

  if (loading) {
    return (
      <div className='main-container justify-center text-xl'>
        <Spinner className='text-lime-500' size='large' />
      </div>
    );
  }

  return (
    <div className='main-container'>
      <Title text={data?.restaurant.restaurant?.name || ''} />
      <div
        className='flex h-72 w-full items-center bg-cover bg-center'
        style={{backgroundImage: `url(${data?.restaurant.restaurant?.coverImage})`}}>
        <div className='w-80 bg-white px-12 py-5 shadow-xl'>
          <h2 className='text-2xl font-medium'>{data?.restaurant.restaurant?.name}</h2>
          <span className='mb-2 block capitalize text-gray-800'>
            {data?.restaurant.restaurant?.category?.name}
          </span>
          <address className='text-sm text-gray-700'>
            {data?.restaurant.restaurant?.address}
          </address>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
