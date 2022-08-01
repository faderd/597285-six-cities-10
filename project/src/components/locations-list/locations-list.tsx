import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Location } from '../../const';
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

  const getLocationsList = () => {
    const content: JSX.Element[] = [];

    Object.entries(Location).forEach((item) => {
      content.push(
        <li className="locations__item">
          <Link className={`locations__item-link tabs__item ${item[1].name === currentCity.name ? 'tabs__item--active' : ''}`} onClick={handleClick(item[1], dispatch)} to={''}>
            <span>{item[1].name}</span>
          </Link>
        </li>
      );
    });

    return content;
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {getLocationsList()}
      </ul>
    </section>
  );
}

export default LocationsList;
