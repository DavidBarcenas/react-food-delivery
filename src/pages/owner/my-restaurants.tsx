import {gql, useQuery} from '@apollo/client';
import {Link, useNavigate} from 'react-router-dom';
import Button from '../../components/button';
import RestaurantsGrid from '../../components/restaurants-grid';
import Title from '../../components/title';
import {RESTAURANT_FRAGMENT} from '../../fragments';
import {myRestaurants} from '../../types/myRestaurants';

export const MY_RESTAURANTS_QUERY = gql`
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
  const navigate = useNavigate();
  const {data} = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY);

  function goToAddRestaurant(): void {
    navigate('/add-restaurant');
  }

  return (
    <section>
      <header className='flex justify-between p-10'>
        <Title text='Mis restaurantes' />
        <h2 className='text-2xl font-medium'>Mis restaurantes</h2>
        <Button text='Agregar' mode='normal' onClick={goToAddRestaurant} />
      </header>
      <div className='px-10'>
        {data?.myRestaurants.ok && data.myRestaurants.restaurants.length === 0 ? (
          <div className='text-center'>
            <p>No tienes restaurantes</p>{' '}
            <Link to='/add-restaurant' className='ml-1 text-lime-500 hover:underline'>
              Agregar un restaurante
            </Link>
          </div>
        ) : (
          <RestaurantsGrid restaurants={data?.myRestaurants.restaurants} />
        )}
      </div>
    </section>
  );
}

export default MyRestaurants;
