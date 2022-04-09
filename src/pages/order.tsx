import {useEffect} from 'react';
import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {getOrder, getOrderVariables} from '../types/getOrder';
import {orderUpdates} from '../types/orderUpdates';
import {useProfile} from '../hooks/use-profile';

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
  const {data: userProfile} = useProfile();
  const {data, subscribeToMore} = useQuery<getOrder, getOrderVariables>(GET_ORDER_QUERY, {
    variables: {
      input: {
        id: Number(id),
      },
    },
  });

  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: {
          input: {
            id: Number(id),
          },
        },
        updateQuery: (prev, {subscriptionData}: {subscriptionData: {data: orderUpdates}}) => {
          if (!subscriptionData?.data) {
            return prev;
          }
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...subscriptionData.data.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [data]);

  return (
    <div>
      Order
      {userProfile?.me?.role === 'Client' && <h2>{data?.getOrder.order?.status} </h2>}
      {userProfile?.me?.role === 'Owner' && (
        <>
          {data?.getOrder.order?.status === 'Pending' && <button>Aceptar orden</button>}
          {data?.getOrder.order?.status === 'Coocking' && <button>Orden lista</button>}
        </>
      )}
    </div>
  );
}

export default Order;
