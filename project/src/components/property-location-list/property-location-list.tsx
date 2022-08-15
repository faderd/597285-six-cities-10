import { useAppSelector } from '../../hooks';
import { getNearbyOffers } from '../../store/app-data/selectors';
import OffersList from '../offers-list/offers-list';

type PropertyLocationListProps = {
  onActiveCardIdChange: (id: number) => void;
};

function PropertyLocationList({onActiveCardIdChange}: PropertyLocationListProps): JSX.Element {
  const offers = useAppSelector(getNearbyOffers);
  return (
    <OffersList
      onActiveCardIdChange={onActiveCardIdChange}
      offers={offers}
      wrapperClassName={'near-places__list places__list'}
      articleClassName={'near-places__card'}
      imageWrapperClassName={'near-places__image-wrapper'}
      imageWidth={'260'}
      imageHeight={'200'}
      cardInfoClassName={''}
    />
  );
}

export default PropertyLocationList;
