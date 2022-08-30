import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer, Offers } from '../../types/offer';

const DEFAULT_CUSTOM_ICON = leaflet.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const CURRENT_CUSTOM_ICON = leaflet.icon({
  iconUrl: '../img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

type MapProps = {
  selectedOfferId?: number;
  className: string,
  offers: Offers,
  currentCity: City,
};

const markerGroup = leaflet.layerGroup();

function Map({ selectedOfferId, className, offers, currentCity }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity.location);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (map) {
        markerGroup.clearLayers();
        markerGroup.addTo(map);

        map.setView({
          lat: currentCity.location.latitude,
          lng: currentCity.location.longitude,
        }, currentCity.location.zoom);

        offers.forEach((offer: Offer) => {
          leaflet
            .marker({
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            }, {
              icon: (selectedOfferId !== undefined && offer.id === selectedOfferId)
                ? CURRENT_CUSTOM_ICON
                : DEFAULT_CUSTOM_ICON,
            })
            .addTo(markerGroup);
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [currentCity.location.latitude, currentCity.location.longitude, currentCity.location.zoom, map, offers, selectedOfferId]);

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
      data-testid="map"
    />
  );
}

export default Map;
