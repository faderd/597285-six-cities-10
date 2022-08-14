import { memo } from 'react';
import { Offer, Offers } from '../../types/offer';
import { OffersListSetting } from '../../types/settings';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  onActiveCardIdChange: (id: number) => void;
  offersListSetting: OffersListSetting,
  offers: Offers,
};

function OffersList({ onActiveCardIdChange, offersListSetting, offers }: OffersListProps): JSX.Element {

  return (
    <div className={offersListSetting.WrapperClassName}>
      {
        offers.map((offer: Offer) => (
          <OfferCard key={offer.id} offer={offer} onMouseOver={() => onActiveCardIdChange(offer.id)} offersListSetting={offersListSetting} />
        ))
      }
    </div>
  );
}

export default memo(OffersList);
