import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
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

  console.log(data);

  return <div>Category {slug}</div>;
}

export default Category;
