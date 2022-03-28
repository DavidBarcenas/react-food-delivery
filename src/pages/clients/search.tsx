import {gql, useLazyQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import RestaurantsGrid from '../../components/restaurants-grid';
import Title from '../../components/title';
import {RESTAURANT_FRAGMENT} from '../../fragments';
import {searchRestaurant, searchRestaurantVariables} from '../../types/searchRestaurant';

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [lazySearchRestaurant, {data}] = useLazyQuery<searchRestaurant, searchRestaurantVariables>(
    SEARCH_RESTAURANT,
  );

  useEffect(() => {
    const query = location.search.split('?q=')[1];

    if (!query) {
      return navigate('/', {replace: true});
    }

    setSearch(query);
    lazySearchRestaurant({variables: {input: {page: 1, query}}});
  }, []);

  return (
    <div className='px-10'>
      <Title text={search.trim() === '' ? 'Búsqueda' : search} />
      <b className='mb-5 block py-5 text-center text-3xl font-normal'>"{search}"</b>
      <RestaurantsGrid restaurants={data?.searchRestaurant.restaurants} />
    </div>
  );
}

export default Search;
