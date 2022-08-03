import FavoriteLocationList from '../../components/favorite-location-list/favorite-location-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import PageHeader from '../../components/page-header/page-header';
import { Offers } from '../../types/offer';

type FavoritesScreenProps = {
  offers: Offers;
};

function FavoritesScreen({ offers }: FavoritesScreenProps): JSX.Element {
  if (!offers) {
    return (<FavoritesEmpty />);
  }

  return (
    <div className="page">

      <PageHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <FavoriteLocationList offers={offers} />

          </section>
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
