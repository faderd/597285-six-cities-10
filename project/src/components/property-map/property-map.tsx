import { useAppSelector } from '../../hooks';
import { getNearbyOffers } from '../../store/app-data/selectors';
import Map from '../map/map';

const MapSetting = {
  Style: {
    height: '579px',
    width: '1144px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

type PropertyMapProps = {
  selectedOfferId?: number;
};

function PropertyMap({ selectedOfferId }: PropertyMapProps): JSX.Element {
  const offers = useAppSelector(getNearbyOffers);

  return (
    <Map selectedOfferId={selectedOfferId} mapSetting={MapSetting} offers={offers} />
  );
}

export default PropertyMap;
