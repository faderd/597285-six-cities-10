import { FormEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { login } from '../../store/api-actions';
import { changeActiveCity } from '../../store/app-data/app-data';
import { isUserAuthorized } from '../../store/user-process/selectors';
import { getRandomCity } from '../../utils/common';

function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const city = getRandomCity();
  const isUserAuth = useAppSelector(isUserAuthorized);

  useEffect(() => {
    if (isUserAuth) {
      navigate(AppRoute.Main);
    }
  });

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(login({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required ref={loginRef} />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
                  pattern="(?=.*[0-9])(?=.*[a-zA-Z]).{2,}$"
                />
              </div>
              <button className="login__submit form__submit button" type="submit" >Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(changeActiveCity(city));
                  navigate(AppRoute.Main);
                }}
                to=""
              >
                <span>{city && city.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
