import { Offers } from '../../types/offer';
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
                offers.map((offer) => {
                  if (offer.city.name !== city) { return null; }

                  return (
                    <OfferCard key={offer.id} offer={offer} isForFavorite />
                  );
                })
              }
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default FavoriteLocationList;
