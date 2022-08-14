import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { Offer, Offers } from '../../types/offer';
import { getCurrentCity } from '../../store/app-data/selectors';
import { CURRENT_CUSTOM_ICON, DEFAULT_CUSTOM_ICON } from '../../const';
import { MapSetting } from '../../types/settings';

type MapProps = {
  selectedOfferId?: number;
  mapSetting: MapSetting,
  offers: Offers,
};

const markerGroup = leaflet.layerGroup();

function Map({ selectedOfferId, mapSetting, offers }: MapProps): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);

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
      className="cities__map map"
      style={mapSetting.Style}
      ref={mapRef}
    />
  );
}

export default Map;
