import { useAppSelector } from '../../hooks';
import { getNearbyOffers } from '../../store/app-data/selectors';
import { City, Offer } from '../../types/offer';
import Map from '../map/map';

type PropertyMapProps = {
  currentCity: City;
  currentOffer: Offer,
};

function PropertyMap({ currentCity, currentOffer }: PropertyMapProps): JSX.Element {
  const offers = [...useAppSelector(getNearbyOffers), currentOffer];

  return (
    <Map selectedOfferId={currentOffer.id} mapClassName="property__map" offers={offers} currentCity={currentCity} />
  );
}

export default PropertyMap;
