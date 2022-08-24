import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, FavoriteActionStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleFavoriteOffer } from '../../store/api-actions';
import { isUserAuthorized } from '../../store/user-process/selectors';
import { Offer } from '../../types/offer';

type BookmarkButtonProps = {
  offer: Offer;
  className: string;
  iconWidth: number;
  iconHeight: number;
};

function BookmarkButton({ offer, className, iconHeight, iconWidth }: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(isUserAuthorized);
  const favoriteClassName = offer.isFavorite
    ? `${className}--active`
    : '';

  return (
    <button
      className={`${className} ${favoriteClassName} button`}
      type="button"
      onClick={() => {
        if (!isAuthorized) {
          navigate(AppRoute.Login);
        }

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

export default memo(BookmarkButton);
