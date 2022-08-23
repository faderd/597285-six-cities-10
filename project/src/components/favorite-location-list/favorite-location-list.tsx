import { Link } from 'react-router-dom';
import { GroupedFavoritesOffers } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type FavoriteLocationListProps = {
  groupedFavoritesOffers: GroupedFavoritesOffers
};

function FavoriteLocationList({ groupedFavoritesOffers }: FavoriteLocationListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {
        groupedFavoritesOffers.map((groupedFavoritesOffer) => (
          <li className="favorites__locations-items" key={groupedFavoritesOffer.city.name}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to="/">
                  <span>{groupedFavoritesOffer.city.name}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {
                groupedFavoritesOffer.offers.map((offer) => (
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
