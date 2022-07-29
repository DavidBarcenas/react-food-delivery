import {gql, useQuery} from '@apollo/client';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import Pagination from '../../components/pagination';
import RestaurantsGrid from '../../components/restaurants-grid';
import Title from '../../components/title';
import {CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT} from '../../fragments';
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
        ...CategoryFragment
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

function Restaurants() {
  const {register, handleSubmit} = useForm<{q: string}>();
  const navigate = useNavigate();
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

  function submitForm({q}: {q: string}) {
    navigate({pathname: '/search', search: `?q=${q}`});
  }

  function nextPage() {
    setPage(current => current + 1);
  }

  function prevPage() {
    setPage(current => current - 1);
  }

  return (
    <div className='pb-20'>
      <Title text='Inicio' />
      <div className='mb-7 h-64 w-full bg-gray-800'>
        {/* <form className='m-auto w-5/12' onSubmit={handleSubmit(submitForm)} autoComplete='off'>
          <input
            type='search'
            placeholder='Buscar un restaurante'
            className='input'
            {...register('q', {required: true})}
          />
        </form> */}
        <img
          src='https://cazaofertas.com.mx/wp-content/uploads/2020/03/Beer-Factory-lunes-090320-01.jpg'
          alt='Banner'
          className='h-64 w-full object-cover'
        />
      </div>
      {!loading ? (
        <div className='px-10'>
          <div className='mb-10 flex justify-center'>
            {data?.allCategories.categories?.map(category => (
              <Link
                to={`category/${category.slug}`}
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
              </Link>
            ))}
          </div>
          <RestaurantsGrid restaurants={data?.restaurants.results} />
          <Pagination
            currentPage={page}
            totalPages={data?.restaurants.totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Restaurants;
