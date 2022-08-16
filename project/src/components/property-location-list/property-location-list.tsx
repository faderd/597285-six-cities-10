import { useAppSelector } from '../../hooks';
import { getNearbyOffers } from '../../store/app-data/selectors';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

function PropertyLocationList(): JSX.Element {
  const offers = useAppSelector(getNearbyOffers);
  return (
    <div className="near-places__list places__list">
      {
        offers.map((offer: Offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            articleClassName="near-places__card"
            imageWrapperClassName="near-places__image-wrapper"
            imageWidth="260"
            imageHeight="200"
            cardInfoClassName=""
          />
        ))
      }
    </div>
  );
}

export default PropertyLocationList;
