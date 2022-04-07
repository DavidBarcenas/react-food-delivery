import {gql, useQuery} from '@apollo/client';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import Button from '../../components/button';
import Spinner from '../../components/spinner';
import Title from '../../components/title';
import {DISH_FRAGMENT, RESTAURANT_FRAGMENT} from '../../fragments';
import {CreateOrderItemInput} from '../../types/globalTypes';
import {restaurant, restaurantVariables} from '../../types/restaurant';

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantFragment
        menu {
          ...DishFragment
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

function Restaurant() {
  const params = useParams<{id: string}>();
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const {data, loading} = useQuery<restaurant, restaurantVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: Number(params.id),
      },
    },
  });

  function addItemsToOrder(dishId: number) {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems(current => [{dishId}, ...current]);
  }

  function startOrder() {
    setOrderStarted(true);
  }

  function removeFromOrder(dishId: number) {
    setOrderItems(current => current.filter(item => item.dishId !== dishId));
  }

  function isSelected(dishId: number) {
    return !!orderItems.find(order => order.dishId === dishId);
  }

  if (loading) {
    return (
      <div className='main-container justify-center text-xl'>
        <Spinner className='text-lime-500' size='large' />
      </div>
    );
  }

  console.log(orderItems);

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
          <Button text='Ordenar' onClick={startOrder} />
        </div>
      </div>
      <ul className='flex'>
        {data?.restaurant.restaurant?.menu.map(dish => (
          <li
            key={dish.id}
            className={`border px-5 py-3 ${isSelected(dish.id) ? 'border-lime-500' : ''}`}
            onClick={() =>
              orderStarted && !isSelected(dish.id)
                ? addItemsToOrder(dish.id)
                : removeFromOrder(dish.id)
            }
            aria-hidden='true'>
            <h3>{dish.name}</h3>
            {dish.options?.map(option => (
              <div key={option.name + dish.id}>
                {option.name}: {option.extra}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Restaurant;
