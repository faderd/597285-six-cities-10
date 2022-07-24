import { Offers } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

const NUMBER_OF_CARDS = 4;

type OffersListProps = {
  offers: Offers;
  setActiveCardId: (arg0: number) => void;
};

function OffersList({ offers, setActiveCardId }: OffersListProps): JSX.Element {

  const offersForRender: Offers = offers.slice(0, NUMBER_OF_CARDS);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offersForRender.map((offer) => (
          <OfferCard key={offer.id} offer={offer} onMouseOver={() => setActiveCardId(offer.id)} />
        ))
      }
    </div>
  );
}

export default OffersList;
