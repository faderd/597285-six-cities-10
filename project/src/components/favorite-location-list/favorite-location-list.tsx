import { Offers } from '../../types/offer';
import OffersList from '../offers-list/offers-list';

enum OffersListSetting {
  WrapperClassName = 'favorites__places',
  ArticleClassName = 'favorites__card',
  ImageWrapperClassName = 'favorites__image-wrapper',
  ImageWidth = '150',
  ImageHeight = '110',
  CardInfoClassName = 'favorites__card-info place-card__info',
}

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
            <OffersList offersListSetting={OffersListSetting} onActiveCardIdChange={() => null} offers={offers} />
          </li>
        ))
      }
    </ul>
  );
}

export default FavoriteLocationList;
