import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import PageHeader from '../../components/page-header/page-header';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--favorites-empty">

      <PageHeader />

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">404 page not found</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">404</b>
              <p className="favorites__status-description">Nothing found</p>
              <Link to={'/'}>Go back to the main page</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundScreen;
