import { useAppSelector } from '../../hooks';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  onActiveCardIdChange: (id: number) => void;
};


function OffersList({ onActiveCardIdChange }: OffersListProps): JSX.Element {

  const offersList = useAppSelector((state) => state.offersList);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offersList.map((offer) => (
          <OfferCard key={offer.id} offer={offer} onMouseOver={() => onActiveCardIdChange(offer.id)} />
        ))
      }
    </div>
  );
}

export default OffersList;
