import { Offers } from '../../types/offer';
import FavoriteLocationItem from '../favorite-location-item/favorite-location-item';

type FavoriteLocationListProps = {
  favorites: Offers;
};

function FavoriteLocationList({ favorites }: FavoriteLocationListProps): JSX.Element {
  const cities = Array.from(new Set(favorites.map((favorite) => favorite.city.name)));

  return (
    <ul className="favorites__list">
      {
        cities.map((city, id) => {
          const keyValue = id;

          return (
            <li className="favorites__locations-items" key={keyValue}>
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="/">
                    <span>{city}</span>
                  </a>
                </div>
              </div>

              <div className="favorites__places">
                {
                  favorites.map((favorite, key) => {
                    if (favorite.city.name !== city) { return null; }

                    const keyId = key;

                    return (
                      <article className="favorites__card place-card" key={keyId}>
                        <FavoriteLocationItem favorite={favorite} />
                      </article>
                    );
                  })
                }
              </div>
            </li>
          );
        })
      }
    </ul>
  );
}

export default FavoriteLocationList;
