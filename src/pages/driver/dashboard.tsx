import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl';
import {useEffect, useState} from 'react';

interface Coords {
  lat: number;
  lng: number;
}

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAP_KEY || '',
});

function Dashboard() {
  const [coords, setCoords] = useState<Coords>({lat: 0, lng: 0});

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  function onSuccess({coords}: GeolocationPosition) {
    setCoords({lat: coords.latitude, lng: coords.longitude});
  }

  function onError(error: GeolocationPositionError) {
    console.log(error);
  }

  return (
    <div>
      <div>
        <Map
          style='mapbox://styles/mapbox/streets-v9'
          center={[coords.lng, coords.lat]}
          zoom={[15]}
          containerStyle={{
            height: '90vh',
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
    </div>
  );
}

export default Dashboard;
