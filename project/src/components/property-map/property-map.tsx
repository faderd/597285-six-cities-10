import { useAppSelector } from '../../hooks';
import { getNearbyOffers } from '../../store/app-data/selectors';
import { City } from '../../types/offer';
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
};

function PropertyMap({ selectedOfferId, currentCity }: PropertyMapProps): JSX.Element {
  const offers = useAppSelector(getNearbyOffers);

  return (
    <Map selectedOfferId={selectedOfferId} mapSetting={MapSetting} offers={offers} currentCity={currentCity} />
  );
}

export default PropertyMap;
