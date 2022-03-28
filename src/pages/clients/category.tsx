import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import RestaurantsGrid from '../../components/restaurants-grid';
import {CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT} from '../../fragments';
import {category, categoryVariables} from '../../types/Category';

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      category {
        ...CategoryFragment
        restaurants {
          ...RestaurantFragment
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

function Category() {
  const {slug} = useParams();
  const {data} = useQuery<category, categoryVariables>(CATEGORY_QUERY, {
    variables: {
      input: {
        page: 1,
        slug: slug || '',
      },
    },
  });

  return (
    <div className='px-10'>
      <div className='mb-5 flex items-center justify-center py-10'>
        <img
          src={data?.category.category?.coverImage || ''}
          alt={data?.category.category?.name}
          className='mr-3 w-24'
        />
        <h3 className='text-xl font-semibold capitalize'>{data?.category.category?.name}</h3>
      </div>
      <RestaurantsGrid restaurants={data?.category.category?.restaurants} />
    </div>
  );
}

export default Category;
