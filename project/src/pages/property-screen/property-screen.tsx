import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import ReviewForm from '../../components/form-submit-comment/form-submit-comment';
import PageHeader from '../../components/page-header/page-header';
import PropertyLocationList from '../../components/property-location-list/property-location-list';
import PropertyMap from '../../components/property-map/property-map';
import Reviews from '../../components/reviews/reviews';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNearbyOffers, fetchOffer, fetchOfferReviews } from '../../store/api-actions';
import { storeNearbyOffers, storeReviews } from '../../store/app-data/app-data';
import { getOfferById } from '../../store/app-data/selectors';
import { isUserAuthorized } from '../../store/user-process/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function PropertyScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const offerId = useParams().id;
  const offer = useAppSelector(getOfferById(offerId));
  const isAuthorized = useAppSelector(isUserAuthorized);

  useEffect(() => {

    if (offerId) {
      if (!offer) {
        dispatch(fetchOffer(offerId));
      }

      dispatch(fetchOfferReviews(offerId));
      dispatch(fetchNearbyOffers(offerId));
    }

    return () => {
      // очистим store при размонтировании компонента
      dispatch(storeReviews([]));
      dispatch(storeNearbyOffers([]));
    };
  });

  if (!offerId || offer === undefined) {
    return (<NotFoundScreen />);
  }

  return (
    <div className="page">

      <PageHeader />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                offer.images.map((imageUrl, index) => (
                  <div key={`${index + 1}`} className="property__image-wrapper">
                    <img className="property__image" src={imageUrl} alt="Studio" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <BookmarkButton
                  offer={offer}
                  buttonClassName="property__bookmark-button"
                  buttonClassNameActive="property__bookmark-button--active"
                  iconWidth={31}
                  iconHeight={33}
                />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${offer.rating / 5 * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    offer.goods.map((item, index) => (
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
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                  <span className="property__user-status">
                    {offer.host.isPro && ('Pro')}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">

                <Reviews />

                {isAuthorized && (<ReviewForm offerId={offerId} />)}

              </section>
            </div>
          </div>
          <PropertyMap currentCity={offer.city} currentOffer={offer} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PropertyLocationList />
          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyScreen;
