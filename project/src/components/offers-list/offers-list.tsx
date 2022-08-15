import { memo } from 'react';
import { Offer, Offers } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  onActiveCardIdChange: (id: number) => void,
  offers: Offers,
  wrapperClassName: string,
  articleClassName: string,
  imageWrapperClassName: string,
  imageWidth: string,
  imageHeight: string,
  cardInfoClassName: string,
};

function OffersList({ onActiveCardIdChange, offers, articleClassName, imageWrapperClassName, imageWidth, imageHeight, cardInfoClassName, wrapperClassName }: OffersListProps): JSX.Element {

  return (
    <div className={wrapperClassName}>
      {
        offers.map((offer: Offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onMouseOver={() => onActiveCardIdChange(offer.id)}
            articleClassName={articleClassName}
            imageWrapperClassName={imageWrapperClassName}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            cardInfoClassName={cardInfoClassName}
          />
        ))
      }
    </div>
  );
}

export default memo(OffersList);
