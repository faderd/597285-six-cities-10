import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';


const URL_MARKER_DEFAULT = '../img/pin.svg';
const URL_MARKER_CURRENT = '../img/pin-active.svg';

type MapProps = {
  selectedOfferId?: number;
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

const markerGroup = leaflet.layerGroup();

function Map({ selectedOfferId }: MapProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const offersList = useAppSelector((state) => state.offersList);

  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity.location);

  useEffect(() => {
    if (map) {
      markerGroup.clearLayers();
      markerGroup.addTo(map);

      map.setView({
        lat: currentCity.location.latitude,
        lng: currentCity.location.longitude,
      }, currentCity.location.zoom);

      offersList.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (selectedOfferId !== undefined && offer.id === selectedOfferId)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(markerGroup);
      });
    }
  }, [currentCity.location.latitude, currentCity.location.longitude, currentCity.location.zoom, map, offersList, selectedOfferId]);

  return (
    <section
      className="cities__map map"
      style={{ height: '752px' }}
      ref={mapRef}
    />
  );
}

export default Map;
