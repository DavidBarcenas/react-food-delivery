import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl';
import {useEffect, useState} from 'react';
import {gql, useMutation, useSubscription} from '@apollo/client';
import {cookedOrders} from '../../types/cookedOrders';
import {takeOrder, takeOrderVariables} from '../../types/takeOrder';

interface Coords {
  lat: number;
  lng: number;
}

const COOCKED_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrders {
    cookedOrders {
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

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
    }
  }
`;

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAP_KEY || '',
});

function Dashboard() {
  const [coords, setCoords] = useState<Coords>({lat: 0, lng: 0});
  const {data} = useSubscription<cookedOrders>(COOCKED_ORDERS_SUBSCRIPTION);
  const [takeOrderMutation] = useMutation<takeOrder, takeOrderVariables>(TAKE_ORDER_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  useEffect(() => {
    if (data?.cookedOrders.id) {
      // agregar la direccion del conductor
    }
  }, [data]);

  function onCompleted() {
    // navigate to order
  }

  function onSuccess({coords}: GeolocationPosition) {
    setCoords({lat: coords.latitude, lng: coords.longitude});
  }

  function onError(error: GeolocationPositionError) {
    console.log(error);
  }

  function sendOrder() {
    takeOrderMutation({
      variables: {
        input: {
          id: Number(data?.cookedOrders.id),
        },
      },
    });
  }

  return (
    <div>
      <div>
        <Map
          style='mapbox://styles/mapbox/streets-v9'
          center={[coords.lng, coords.lat]}
          zoom={[15]}
          containerStyle={{
            height: '40vh',
            width: '100vw',
          }}>
          <Layer
            type='circle'
            id='marker'
            paint={{
              'circle-stroke-width': 0,
              'circle-radius': 10,
              'circle-blur': 0.15,
              'circle-color': '#abdbe3',
            }}>
            <Feature coordinates={[coords.lng, coords.lat]} />
          </Layer>
        </Map>
        ;
      </div>
      {data?.cookedOrders && (
        <>
          <h1>{data.cookedOrders.status}</h1>
          <button onClick={sendOrder}>Entregar pedido</button>
        </>
      )}
    </div>
  );
}

export default Dashboard;
