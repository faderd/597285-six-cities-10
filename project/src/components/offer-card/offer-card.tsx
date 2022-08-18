import { generatePath, Link } from 'react-router-dom';
import { AppRoute, FavoriteActionStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { actionFavoriteOffer } from '../../store/api-actions';
import { Offer } from '../../types/offer';

type OfferCardProps = {
  offer: Offer;
  onMouseOver?: () => void;
  articleClassName: string,
  imageWrapperClassName: string,
  imageWidth: string,
  imageHeight: string,
  cardInfoClassName: string,
};

function OfferCard({ offer, onMouseOver, articleClassName, imageWrapperClassName, imageWidth, imageHeight, cardInfoClassName }: OfferCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteClassName = offer.isFavorite
    ? 'place-card__bookmark-button--active '
    : '';

  return (
    <article className={`${articleClassName} place-card`} onMouseOver={onMouseOver} >
      {
        offer.isPremium && (<div className="place-card__mark"><span>Premium</span></div>)
      }

      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.Room, { id: `${offer.id}` })}>
          <img className="place-card__image" src={offer.previewImage} width={imageWidth} height={imageHeight} alt="Place" />
        </Link>
      </div>
      <div className={`${cardInfoClassName} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${favoriteClassName}`}
            type="button"
            onClick={() => {
              const offerId = offer.id.toString();
              const actionStatus = offer.isFavorite
                ? FavoriteActionStatus.RemoveFavorite
                : FavoriteActionStatus.AddFavorite;
              dispatch(actionFavoriteOffer({ offerId, actionStatus }));
            }}
          >
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
