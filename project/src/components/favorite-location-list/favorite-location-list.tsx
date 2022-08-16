import { Offer, Offers } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type FavoriteLocationListProps = {
  offers: Offers;
};

function FavoriteLocationList({ offers }: FavoriteLocationListProps): JSX.Element {
  const cities = Array.from(new Set(offers.map((offer) => offer.city.name)));

  return (
    <ul className="favorites__list">
      {
        cities.map((city) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="/">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {
                offers.map((offer: Offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    articleClassName="favorites__card"
                    imageWrapperClassName="favorites__image-wrapper"
                    imageWidth="150"
                    imageHeight="110"
                    cardInfoClassName="favorites__card-info"
                  />
                ))
              }
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default FavoriteLocationList;
