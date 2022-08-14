import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/form-submit-comment/form-submit-comment';
import PageHeader from '../../components/page-header/page-header';
import PropertyLocationList from '../../components/property-location-list/property-location-list';
import PropertyMap from '../../components/property-map/property-map';
import Reviews from '../../components/reviews/reviews';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNearbyOffers, fetchOffer, fetchReviews } from '../../store/api-actions';
import { changeActiveCity, storeNearbyOffers, storeReviews } from '../../store/app-data/app-data';
import { getOffers } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Offer } from '../../types/offer';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function PropertyScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const offerId = useParams().id;
  const offers = useAppSelector(getOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [activeCardId, setActiveCardId] = useState<number>();

  let currentOffer = null;

  useEffect(() => () => {
    storeReviews([]);
    storeNearbyOffers([]);
  });

  if (!offerId) {
    return (<NotFoundScreen />);
  }

  if (!offers.find((offer: Offer) => offer.id.toString() === offerId)) {
    dispatch(fetchOffer(offerId));
  }

  currentOffer = offers.find((offer: Offer) => offer.id.toString() === offerId);

  if (currentOffer === undefined) {
    return (<NotFoundScreen />);
  }

  dispatch(fetchReviews(offerId));
  dispatch(fetchNearbyOffers(offerId));
  dispatch(changeActiveCity(currentOffer.city));

  const bookmarkButtonClassName = currentOffer.isFavorite
    ? 'property__bookmark-button property__bookmark-button--active button'
    : 'property__bookmark-button button';

  return (
    <div className="page">

      <PageHeader />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                currentOffer.images.map((imageUrl, index) => (
                  <div key={`${index + 1}`} className="property__image-wrapper">
                    <img className="property__image" src={imageUrl} alt="Studio" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.title}
                </h1>
                <button className={bookmarkButtonClassName} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${currentOffer.rating / 5 * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer.type.charAt(0).toUpperCase() + currentOffer.type.slice(1)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{currentOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    currentOffer.goods.map((item, index) => (
                      <li key={`${index + 1}`} className="property__inside-item">
                        {item}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {currentOffer.host.name}
                  </span>
                  <span className="property__user-status">
                    {currentOffer.host.isPro && ('Pro')}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">

                <Reviews />

                {authorizationStatus === AuthorizationStatus.Auth
                  && (<ReviewForm onSubmit={() => { throw new Error('Function "onComment" isn\'t implemented.'); }} />)}

              </section>
            </div>
          </div>
          <PropertyMap selectedOfferId={activeCardId} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PropertyLocationList onActiveCardIdChange={setActiveCardId} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyScreen;
