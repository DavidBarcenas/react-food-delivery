import {gql, useQuery} from '@apollo/client';
import {useState} from 'react';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../types/RestaurantsPageQuery';

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: AllRestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

function Restaurants() {
  const [page, setPage] = useState(1);
  const {data, loading} = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(
    RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    },
  );

  function nextPage() {
    setPage(current => current + 1);
  }

  function prevPage() {
    setPage(current => current - 1);
  }

  return (
    <div className='pb-20'>
      <div className='mb-7 w-full bg-gray-800 px-10 py-20'>
        <form className='m-auto w-5/12'>
          <input type='search' placeholder='Buscar un restaurante' className='input' />
        </form>
      </div>
      {!loading ? (
        <div className='px-10'>
          <div className='mb-10 flex justify-center'>
            {data?.allCategories.categories?.map(category => (
              <div
                key={category.id}
                className='group mx-2 min-w-[80px] max-w-fit cursor-pointer text-center'>
                {category.coverImage && (
                  <img
                    src={category.coverImage}
                    alt={category.name}
                    className='m-auto mb-1 h-10 w-10 rounded-full group-hover:drop-shadow-xl'
                  />
                )}
                <span className='text-sm font-medium capitalize text-gray-600'>
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className='mb-4 grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-4'>
            {data?.restaurants.results?.map(restaurant => (
              <div key={restaurant.id}>
                <img
                  src={restaurant.coverImage}
                  alt={restaurant.name}
                  className='mb-3 h-[180px] w-full object-cover'
                />
                <h3 className='text-lg font-medium leading-none'>{restaurant.name}</h3>
                <span className='text-sm capitalize leading-none text-gray-500'>
                  {restaurant.category?.name}
                </span>
              </div>
            ))}
          </div>
          <div className='flex items-center justify-center'>
            {page > 1 && (
              <button onClick={prevPage}>
                <span className='material-icons pt-1'>west</span>
              </button>
            )}
            <span className='mx-8 text-sm text-gray-600'>
              Página {page} de {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages && (
              <button onClick={nextPage}>
                <span className='material-icons pt-1'>east</span>
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Restaurants;
