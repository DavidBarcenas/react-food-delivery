import {gql, useQuery} from '@apollo/client';
import {Link, useParams} from 'react-router-dom';
import {VictoryBar, VictoryChart} from 'victory';
import {DISH_FRAGMENT, RESTAURANT_FRAGMENT} from '../../fragments';
import {myRestaurant, myRestaurantVariables} from '../../types/myRestaurant';

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
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

const fakeData = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000},
];

function MyRestaurant() {
  const {id} = useParams();
  const {data} = useQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUERY, {
    variables: {
      input: {
        id: Number(id),
      },
    },
  });

  return (
    <div>
      <div
        className='mb-14 flex h-72 w-full items-center bg-cover bg-center'
        style={{backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`}}>
        <div className='w-80 bg-white px-12 py-5 shadow-xl'>
          <h2 className='text-2xl font-medium'>{data?.myRestaurant.restaurant?.name}</h2>
          <span className='mb-2 block capitalize text-gray-800'>
            {data?.myRestaurant.restaurant?.category?.name}
          </span>
          <address className='text-sm text-gray-700'>
            {data?.myRestaurant.restaurant?.address}
          </address>
        </div>
      </div>
      <div className='mb-20 text-center'>
        <Link
          to={`/restaurant/${data?.myRestaurant.restaurant?.id}/add-dish`}
          className='mr-4 bg-gray-600 px-10 py-3 text-white'>
          <span className='material-icons inline-block align-bottom'>add</span> Agregar platillos
        </Link>
        <Link to='' className='bg-lime-500 px-10 py-3 text-white'>
          Comprar promoción <span className='material-icons inline-block align-bottom'>east</span>
        </Link>
      </div>
      {data?.myRestaurant.restaurant?.menu.length === 0 ? (
        <div className='text-center'>Agrega tu primer platillo</div>
      ) : (
        <div>
          {data?.myRestaurant.restaurant?.menu.map(dish => (
            <h2 key={dish.id}>{dish.name}</h2>
          ))}
          <div className='text-center'>
            <h4>Ventas</h4>
            <div className='m-auto max-w-sm'>
              <VictoryChart>
                <VictoryBar data={fakeData} x='quarter' y='earnings' />
              </VictoryChart>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRestaurant;
