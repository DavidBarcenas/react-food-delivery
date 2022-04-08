import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {getOrder, getOrderVariables} from '../types/getOrder';

const GET_ORDER_QUERY = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        id
        status
        total
        driver {
          email
        }
        customer {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`;

function Order() {
  const {id} = useParams();
  const {data} = useQuery<getOrder, getOrderVariables>(GET_ORDER_QUERY, {
    variables: {
      input: {
        id: Number(id),
      },
    },
  });
  console.log(data);
  return <div>Order</div>;
}

export default Order;
