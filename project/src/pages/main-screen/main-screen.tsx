import { useEffect, useState } from 'react';
import LocationsList from '../../components/locations-list/locations-list';
import Map from '../../components/map/map';
import OfferCard from '../../components/offer-card/offer-card';
import PageHeader from '../../components/page-header/page-header';
import SortingForm from '../../components/sorting-form/sorting-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffers } from '../../store/api-actions';
import { getCurrentCity, getIsDataLoadedStatus, getOffersCountFromCity, getOffersFromCity } from '../../store/app-data/selectors';
import { Offer } from '../../types/offer';
import LoadingScreen from '../loading-screen/loading-screen';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const isDataLoaded = useAppSelector(getIsDataLoadedStatus);
  const [activeCardId, setActiveCardId] = useState<number>();
  const offersCount = useAppSelector(getOffersCountFromCity);
  const currentCity = useAppSelector(getCurrentCity);
  const offers = useAppSelector(getOffersFromCity);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  const pageMainClass = offers.length
    ? ''
    : 'page__main--index-empty';

  const containerClassName = offers.length
    ? ''
    : 'cities__places-container--empty';

  const sectionClassName = offers.length
    ? 'cities__places places'
    : 'cities__no-places';

  return (
    <div className="page page--gray page--main">

      <PageHeader isMainScreen />

      <main className={`page__main page__main--index ${pageMainClass}`} data-testid="main-screen">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList />
        </div>
        <div className="cities">
          <div className={`cities__places-container container ${containerClassName}`}>
            <section className={sectionClassName}>
              {offers.length === 0
                ? (
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in {currentCity.name}</p>
                  </div>)
                : (
                  <>
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{offersCount} places to stay in {currentCity.name}</b>
                    <SortingForm />
                    <div className="cities__places-list places__list tabs__content">
                      {
                        offers.map((offer: Offer) => (
                          <OfferCard
                            key={offer.id}
                            onMouseOver={() => setActiveCardId(offer.id)}
                            onMouseOut={() => setActiveCardId(NaN)}
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
                  </>)}
            </section>

            <div className="cities__right-section">
              {offers.length !== 0 && (
                <Map selectedOfferId={activeCardId} className="cities__map" offers={offers} currentCity={currentCity} />
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
