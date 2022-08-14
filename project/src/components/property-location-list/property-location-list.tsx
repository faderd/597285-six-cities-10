import { useAppSelector } from '../../hooks';
import { getNearbyOffers } from '../../store/app-data/selectors';
import OffersList from '../offers-list/offers-list';

enum OffersListSetting {
  WrapperClassName = 'near-places__list places__list',
  ArticleClassName = 'near-places__card',
  ImageWrapperClassName = 'near-places__image-wrapper',
  ImageWidth = '260',
  ImageHeight = '200',
  CardInfoClassName = 'place-card__info',
}

type PropertyLocationListProps = {
  onActiveCardIdChange: (id: number) => void;
};

function PropertyLocationList({onActiveCardIdChange}: PropertyLocationListProps): JSX.Element {
  const offers = useAppSelector(getNearbyOffers);
  return (
    <OffersList offersListSetting={OffersListSetting} onActiveCardIdChange={onActiveCardIdChange} offers={offers} />
  );
}

export default PropertyLocationList;
