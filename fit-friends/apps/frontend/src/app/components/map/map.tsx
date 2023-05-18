import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { CityType, GYM_MAP_PIN, USER_MAP_PIN } from '../../utils/constants';
import useMap from 'apps/frontend/src/hooks/use-map';

type MapProps = {
  city: CityType;
  isGymLocation: boolean;
};

function Map({ city, isGymLocation }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const userIcon = leaflet.icon({
    iconUrl: USER_MAP_PIN,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const gymIcon = leaflet.icon({
    iconUrl: GYM_MAP_PIN,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const icon = isGymLocation ? gymIcon : userIcon;

  useEffect(() => {
    if (map) {
      leaflet
        .marker(
          {
            lat: city.lat,
            lng: city.lng,
          },
          {
            icon: icon,
          }
        )
        .addTo(map);
    }
  }, [map, city]);

  return <div style={{ height: '623px' }} ref={mapRef}></div>;
}

export default Map;
