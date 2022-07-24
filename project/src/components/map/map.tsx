import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { Location, Offers } from '../../types/offer';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: Location;
  points: Offers;
  selectedPointId: number | undefined;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ city, points, selectedPointId }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: (selectedPointId !== undefined && point.id === selectedPointId)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points, selectedPointId]);

  return (
    <section
      className="cities__map map"
      style={{ height: '752px' }}
      ref={mapRef}
    />
  );
}

export default Map;
