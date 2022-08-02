import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { LOCATIONS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeActiveCity } from '../../store/action';
import { getCurrentCity } from '../../store/selectors';
import { City } from '../../types/offer';
import { AppDispatch } from '../../types/state';

const handleClick = (city: City, dispatch: AppDispatch) => (evt: MouseEvent<HTMLAnchorElement>) => {
  evt.preventDefault();
  dispatch(changeActiveCity(city));
};

function LocationsList(): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {LOCATIONS.map((locaton) => (
          <li key={locaton.name} className="locations__item">
            <Link className={`locations__item-link tabs__item ${locaton.name === currentCity.name ? 'tabs__item--active' : ''}`} onClick={handleClick(locaton, dispatch)} to={''}>
              <span>{locaton.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LocationsList;
