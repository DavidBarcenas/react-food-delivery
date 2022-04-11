import {useEffect} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {getOrder, getOrderVariables} from '../types/getOrder';
import {orderUpdates} from '../types/orderUpdates';
import {useProfile} from '../hooks/use-profile';
import {editOrder, editOrderVariables} from '../types/editOrder';
import {OrderStatus, UserRole} from '../types/globalTypes';

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

const EDIT_ORDER_MUTATION = gql`
  mutation editOrder($input: EditOrderInput!) {
    editOrder(input: $input) {
      ok
      error
    }
  }
`;

function Order() {
  const {id} = useParams();
  const {data: userProfile} = useProfile();
  const [editOrderMutation] = useMutation<editOrder, editOrderVariables>(EDIT_ORDER_MUTATION);
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

  function changeOrderStatus(status: OrderStatus) {
    editOrderMutation({
      variables: {
        input: {
          id: Number(id),
          status,
        },
      },
    });
  }

  return (
    <div>
      Order
      {userProfile?.me?.role === UserRole.Client && <h2>{data?.getOrder.order?.status} </h2>}
      {userProfile?.me?.role === UserRole.Owner && (
        <>
          {data?.getOrder.order?.status === OrderStatus.Pending && (
            <button onClick={() => changeOrderStatus(OrderStatus.Coocking)}>Aceptar orden</button>
          )}
          {data?.getOrder.order?.status === OrderStatus.Coocking && (
            <button onClick={() => changeOrderStatus(OrderStatus.Cooked)}>Orden lista</button>
          )}
        </>
      )}
      {userProfile?.me?.role === UserRole.Delivery && (
        <>
          {data?.getOrder.order?.status === OrderStatus.Cooked && (
            <button onClick={() => changeOrderStatus(OrderStatus.PickedUp)}>Entregar orden</button>
          )}
          {data?.getOrder.order?.status === OrderStatus.PickedUp && (
            <button onClick={() => changeOrderStatus(OrderStatus.Delivered)}>Entregado!</button>
          )}
        </>
      )}
      {data?.getOrder.order?.status !== OrderStatus.Pending &&
        data?.getOrder.order?.status !== OrderStatus.Coocking && (
          <h2>{data?.getOrder.order?.status}</h2>
        )}
      {data?.getOrder.order?.status === OrderStatus.Delivered && (
        <h2>Gracias por confirar en nosotros</h2>
      )}
    </div>
  );
}

export default Order;
