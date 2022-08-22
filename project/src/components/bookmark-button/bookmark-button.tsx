import { FavoriteActionStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { toggleFavoriteOffer } from '../../store/api-actions';
import { Offer } from '../../types/offer';

type BookmarkButtonProps = {
  offer: Offer;
  buttonClassName: string;
  iconWidth: number;
  iconHeight: number;
  buttonClassNameActive: string;
};

function BookmarkButton({ offer, buttonClassName, iconHeight, iconWidth, buttonClassNameActive }: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteClassName = offer.isFavorite
    ? buttonClassNameActive
    : '';

  return (
    <button
      className={`${buttonClassName} ${favoriteClassName} button`}
      type="button"
      onClick={() => {
        const offerId = offer.id.toString();
        const actionStatus = offer.isFavorite
          ? FavoriteActionStatus.RemoveFavorite
          : FavoriteActionStatus.AddFavorite;
        dispatch(toggleFavoriteOffer({ offerId, actionStatus }));
      }}
    >
      <svg className="place-card__bookmark-icon" width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
