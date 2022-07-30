import { useAppSelector } from '../../hooks';
import { getOffersFromCity } from '../../store/selectors';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  onActiveCardIdChange: (id: number) => void;
};


function OffersList({ onActiveCardIdChange }: OffersListProps): JSX.Element {

  const offersList = useAppSelector(getOffersFromCity);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offersList.map((offer: Offer) => (
          <OfferCard key={offer.id} offer={offer} onMouseOver={() => onActiveCardIdChange(offer.id)} />
        ))
      }
    </div>
  );
}

export default OffersList;
