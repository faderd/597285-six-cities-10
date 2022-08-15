import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer, Offers } from '../../types/offer';
import { MapSetting } from '../../types/settings';

export const DEFAULT_CUSTOM_ICON = leaflet.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const CURRENT_CUSTOM_ICON = leaflet.icon({
  iconUrl: '../img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

type MapProps = {
  selectedOfferId?: number;
  mapSetting: MapSetting,
  offers: Offers,
  currentCity: City,
};

const markerGroup = leaflet.layerGroup();

function Map({ selectedOfferId, mapSetting, offers, currentCity }: MapProps): JSX.Element {

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
  }, [currentCity.location.latitude, currentCity.location.longitude, currentCity.location.zoom, map, offers, selectedOfferId]);

  return (
    <section
      className={`${mapSetting.ClassName} map`}
      style={mapSetting.Style}
      ref={mapRef}
    />
  );
}

export default Map;
