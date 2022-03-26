import {gql, useLazyQuery} from '@apollo/client';
import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
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
  const [lazySearchRestaurant] = useLazyQuery<searchRestaurant, searchRestaurantVariables>(
    SEARCH_RESTAURANT,
  );

  useEffect(() => {
    const query = location.search.split('?q=')[1];

    if (!query) {
      return navigate('/', {replace: true});
    }

    lazySearchRestaurant({variables: {input: {page: 1, query}}});
  }, []);

  return (
    <div>
      <Title text='Búsqueda' />
      Search
    </div>
  );
}

export default Search;
