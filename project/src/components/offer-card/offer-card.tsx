import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';
import { OffersListSetting } from '../../types/settings';

type OfferCardProps = {
  offer: Offer;
  onMouseOver?: () => void;
  offersListSetting: OffersListSetting,
};

function OfferCard({ offer, onMouseOver, offersListSetting }: OfferCardProps): JSX.Element {
  const favoriteClassName = offer.isFavorite
    ? 'place-card__bookmark-button--active '
    : '';

  return (
    <article className={`${offersListSetting.ArticleClassName} place-card`} onMouseOver={onMouseOver} >
      {
        offer.isPremium && (<div className="place-card__mark"><span>Premium</span></div>)
      }

      <div className={`${offersListSetting.ImageWrapperClassName} place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.Room, { id: `${offer.id}` })}>
          <img className="place-card__image" src={offer.previewImage} width={offersListSetting.ImageWidth} height={offersListSetting.ImageHeight} alt="Place" />
        </Link>
      </div>
      <div className={offersListSetting.CardInfoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${favoriteClassName}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating / 5 * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Room, { id: `${offer.id}` })}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
