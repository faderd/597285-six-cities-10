import { useAppSelector } from '../../hooks';
import { getNearbyOffers } from '../../store/app-data/selectors';
import { City, Offer } from '../../types/offer';
import Map from '../map/map';

const MapSetting = {
  Style: {
    height: '579px',
    width: '1144px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ClassName: 'property__map',
};

type PropertyMapProps = {
  selectedOfferId?: number;
  currentCity: City;
  currentOffer: Offer,
};

function PropertyMap({ selectedOfferId, currentCity, currentOffer }: PropertyMapProps): JSX.Element {
  const offers = useAppSelector(getNearbyOffers);

  return (
    <Map selectedOfferId={selectedOfferId} mapSetting={MapSetting} offers={offers} currentCity={currentCity} currentOffer={currentOffer} />
  );
}

export default PropertyMap;
