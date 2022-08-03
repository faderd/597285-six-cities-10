import { Link } from 'react-router-dom';

type LogoProps = {
  isMainScreen?: boolean,
};

function Logo({ isMainScreen }: LogoProps): JSX.Element {
  const linkClassName = isMainScreen
    ? 'header__logo-link'
    : 'header__logo-link header__logo-link--active';

  return (
    <Link className={linkClassName} to="/">
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

export default Logo;
