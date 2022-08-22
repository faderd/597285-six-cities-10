import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/api-actions';
import { getFavoriteOffersCount } from '../../store/app-data/selectors';
import { getAvatarUrl, getEmail, isUserAuthorized } from '../../store/user-process/selectors';

function UserMenu(): JSX.Element {
  const email = useAppSelector(getEmail);
  const dispatch = useAppDispatch();
  const avatarUrl = useAppSelector(getAvatarUrl) || undefined;
  const isAuthorized = useAppSelector(isUserAuthorized);
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);

  if (isAuthorized) {
    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img className="user__avatar" src={avatarUrl} alt="User avatar"/>
            </div>
            <span className="header__user-name user__name">{email}</span>
            <span className="header__favorite-count">{favoriteOffersCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logout());
            }}
            to="/"
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    </ul>
  );
}

export default UserMenu;
