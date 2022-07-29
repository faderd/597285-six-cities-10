import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Location } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { cityChange, offersListFill } from '../../store/action';
import { City, Offers } from '../../types/offer';
import { AppDispatch } from '../../types/state';
import { getOffersFromCity } from '../../utils';

type LocationListProps = {
  offers: Offers;
}

const mouseClickHandler = (city: City, dispatch: AppDispatch, offers: Offers) => (evt: MouseEvent<HTMLAnchorElement>) => {
  evt.preventDefault();
  dispatch(cityChange(city));

  const offersList: Offers = getOffersFromCity(offers, city);
  dispatch(offersListFill(offersList));
};

function LocationsList({ offers }: LocationListProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const getLocationsList = () => {
    const content: JSX.Element[] = [];

    Object.entries(Location).forEach((item) => {
      content.push(
        <li className="locations__item">
          <Link className={`locations__item-link tabs__item ${item[1].name === currentCity.name ? 'tabs__item--active' : ''}`} onClick={mouseClickHandler(item[1], dispatch, offers)} to={''}>
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
