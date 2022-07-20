import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';

type FavoriteLocationItemProps = {
  favorite: Offer;
};

function FavoriteLocationItem({ favorite }: FavoriteLocationItemProps): JSX.Element {
  const isItFavorite = (isFavorite: boolean): string => isFavorite ? 'place-card__bookmark-button--active ' : '';

  return (
    <>
      {
        favorite.isPremium
          ? (<div className="place-card__mark"><span>Premium</span></div>)
          : null
      }
      <div className="favorites__image-wrapper place-card__image-wrapper" >
        <Link to={`${AppRoute.Room}/${favorite.id}`}>
          <img className="place-card__image" src={favorite.previewImage} width="150" height="110" alt="Place" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{favorite.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isItFavorite(favorite.isFavorite)}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${favorite.rating / 5 * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${favorite.id}`}>{favorite.title}</Link>
        </h2>
        <p className="place-card__type">{favorite.type}</p>
      </div>
    </>
  );
}

export default FavoriteLocationItem;
