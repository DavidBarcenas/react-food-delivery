import {gql, useQuery, useSubscription} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {getOrder, getOrderVariables} from '../types/getOrder';
import {orderUpdates, orderUpdatesVariables} from '../types/orderUpdates';

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

// TODO: Create order fragment
const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
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
`;

function Order() {
  const {id} = useParams();
  const {data: subscriptionData} = useSubscription<orderUpdates, orderUpdatesVariables>(
    ORDER_SUBSCRIPTION,
    {
      variables: {
        input: {
          id: Number(id),
        },
      },
    },
  );
  const {data} = useQuery<getOrder, getOrderVariables>(GET_ORDER_QUERY, {
    variables: {
      input: {
        id: Number(id),
      },
    },
  });
  console.log(subscriptionData);
  return <div>Order</div>;
}

export default Order;
