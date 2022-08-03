import { useState } from 'react';
import LocationsList from '../../components/locations-list/locations-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import PageHeader from '../../components/page-header/page-header';
import { useAppSelector } from '../../hooks';
import { getCurrentCity, getOffersCountFromCity } from '../../store/selectors';

function MainScreen(): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<number>();
  const offersCount = useAppSelector(getOffersCountFromCity);
  const currentCity = useAppSelector(getCurrentCity);

  return (
    <div className="page page--gray page--main">

      <PageHeader isMainScreen />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {currentCity.name}</b>
              <form className="places__sorting" action="/#" method="get">
                <span className="places__sorting-caption">Sort by </span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>

              <OffersList onActiveCardIdChange={setActiveCardId} />

            </section>
            <div className="cities__right-section">
              <Map selectedOfferId={activeCardId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
