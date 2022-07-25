import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import { Location, Offers } from '../../types/offer';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';


const URL_MARKER_DEFAULT = '../img/pin.svg';
const URL_MARKER_CURRENT = '../img/pin-active.svg';

type MapProps = {
  city: Location;
  offers: Offers;
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

function Map({ city, offers, selectedOfferId }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (selectedOfferId !== undefined && offer.id === selectedOfferId)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, selectedOfferId]);

  return (
    <section
      className="cities__map map"
      style={{ height: '752px' }}
      ref={mapRef}
    />
  );
}

export default Map;
