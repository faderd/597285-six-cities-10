import FavoriteLocationList from '../../components/favorite-location-list/favorite-location-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import Footer from '../../components/footer/footer';
import PageHeader from '../../components/page-header/page-header';
import { useAppSelector } from '../../hooks';
import { getGroupedFavoritesOffers } from '../../store/app-data/selectors';

function FavoritesScreen(): JSX.Element {
  const groupedFavoritesOffers = useAppSelector(getGroupedFavoritesOffers);

  if (groupedFavoritesOffers.length === 0) {
    return (<FavoritesEmpty />);
  }

  return (
    <div className="page">

      <PageHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <FavoriteLocationList groupedFavoritesOffers={groupedFavoritesOffers} />

          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesScreen;
