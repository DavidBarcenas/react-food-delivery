import {gql, useMutation, useQuery} from '@apollo/client';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../../components/button';
import Spinner from '../../components/spinner';
import Title from '../../components/title';
import {DISH_FRAGMENT, RESTAURANT_FRAGMENT} from '../../fragments';
import {createOrder, createOrderVariables} from '../../types/createOrder';
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
      orderId
    }
  }
`;

function Restaurant() {
  const params = useParams<{id: string}>();
  const navigate = useNavigate();
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const {data, loading} = useQuery<restaurant, restaurantVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: Number(params.id),
      },
    },
  });
  const [createOrderMutation, {loading: placingOrder}] = useMutation<
    createOrder,
    createOrderVariables
  >(CREATE_ORDER_MUTATION, {onCompleted});

  function addItemsToOrder(dishId: number) {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems(current => [{dishId, options: []}, ...current]);
  }

  function startOrder() {
    setOrderStarted(true);
  }

  function removeFromOrder(dishId: number) {
    setOrderItems(current => current.filter(item => item.dishId !== dishId));
  }

  function isSelected(dishId: number) {
    return !!getItem(dishId);
  }

  function getItem(dishId: number) {
    return orderItems.find(order => order.dishId === dishId);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function addOptionToItem(dishId: number, options: any) {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = oldItem.options?.find(option => option.name === options.name);
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems(current => [{dishId, options: [options, ...oldItem.options!]}, ...current]);
      }
    }
  }

  function getOptionFromItem(item: CreateOrderItemInput, optionName: string) {
    return item.options?.find(option => option.name === optionName);
  }

  function isOptionSelected(dishId: number, optionName: string) {
    const item = getItem(dishId);
    if (item) {
      return !!getOptionFromItem(item, optionName);
    }
  }

  function removeOptionFromItem(dishId: number, optionName: string) {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems(current => [
        {dishId, options: oldItem.options?.filter(option => option.name !== optionName)},
        ...current,
      ]);
    }
  }

  function cancelOrder() {
    setOrderStarted(false);
    setOrderItems([]);
  }

  function confirmrOrder() {
    if (orderItems.length === 0) {
      console.log('no ha seleccionado nada');
      return;
    }
    console.log('confirm order');
    if (!placingOrder) {
      createOrderMutation({
        variables: {
          input: {
            restaurantId: Number(params.id),
            items: [
              {
                dishId: orderItems[0].dishId,
                options: orderItems[0].options?.map(option => ({name: option.name})),
              },
            ],
          },
        },
      });
    }
  }

  function onCompleted(data: createOrder) {
    const {createOrder} = data;
    if (data.createOrder.ok) {
      console.log('order created');
      navigate(`/orders/${createOrder.orderId}`);
    }
  }

  console.log(orderItems);

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
          {!orderStarted ? (
            <Button text='Ordenar' onClick={startOrder} />
          ) : (
            <>
              <Button text='Cancelar' onClick={cancelOrder} />
              <Button text='Confirmar' onClick={confirmrOrder} />
            </>
          )}
        </div>
      </div>
      <ul className='flex'>
        {data?.restaurant.restaurant?.menu.map(dish => (
          <li
            key={dish.id}
            className={`border px-5 py-3 ${isSelected(dish.id) ? 'border-lime-500' : ''}`}>
            <h3>
              {dish.name}
              <button
                className='ml-2 text-lime-500'
                onClick={() =>
                  orderStarted && !isSelected(dish.id)
                    ? addItemsToOrder(dish.id)
                    : removeFromOrder(dish.id)
                }>
                Agregar
              </button>
            </h3>
            {dish.options?.map(option => (
              <div
                key={option.name + dish.id}
                className={`border ${
                  isOptionSelected(dish.id, option.name) ? 'border-red-500' : ''
                }`}>
                {option.name}: {option.extra}
                <button onClick={() => addOptionToItem(dish.id, option)}>+</button>
                <button onClick={() => removeOptionFromItem(dish.id, option.name)}>-</button>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Restaurant;
