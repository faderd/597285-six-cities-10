import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/api-actions';
import { getAuthorizationStatus, getAvatarUrl, getEmail } from '../../store/selectors';

function UserMenu(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const email = useAppSelector(getEmail);
  const dispatch = useAppDispatch();
  const avatarUrl = useAppSelector(getAvatarUrl) || undefined;

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img className="user__avatar" src={avatarUrl} alt="User avatar"/>
            </div>
            <span className="header__user-name user__name">{email}</span>
            <span className="header__favorite-count">3</span>
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
