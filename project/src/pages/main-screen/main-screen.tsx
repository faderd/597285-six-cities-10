import { useState } from 'react';
import LocationsList from '../../components/locations-list/locations-list';
import Map from '../../components/map/map';
import OfferCard from '../../components/offer-card/offer-card';
import PageHeader from '../../components/page-header/page-header';
import { useAppSelector } from '../../hooks';
import { getCurrentCity, getOffersCountFromCity, getOffersFromCity } from '../../store/app-data/selectors';
import { Offer } from '../../types/offer';

function MainScreen(): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<number>();
  const offersCount = useAppSelector(getOffersCountFromCity);
  const currentCity = useAppSelector(getCurrentCity);
  const offers = useAppSelector(getOffersFromCity);

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
              <div className="cities__places-list places__list tabs__content">
                {
                  offers.map((offer: Offer) => (
                    <OfferCard
                      key={offer.id}
                      onMouseOver={() => setActiveCardId(offer.id)}
                      offer={offer}
                      articleClassName="cities__card"
                      imageWrapperClassName="cities__image-wrapper"
                      imageWidth="260"
                      imageHeight="200"
                      cardInfoClassName=""
                    />
                  ))
                }
              </div>
            </section>
            <div className="cities__right-section">
              <Map selectedOfferId={activeCardId} mapClassName="cities__map" offers={offers} currentCity={currentCity} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
