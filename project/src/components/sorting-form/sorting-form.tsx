import { memo, useState } from 'react';
import { SortingType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { storeSortingType } from '../../store/app-data/app-data';
import { getSortingType } from '../../store/app-data/selectors';
import classNames from 'classnames';

export const SORTING_TYPES = [
  { value: SortingType.Popular, label: 'Popular' },
  { value: SortingType.PriceLowToHigh, label: 'Price: low to high' },
  { value: SortingType.PriceHighToLow, label: 'Price: high to low' },
  { value: SortingType.TopRatedFirst, label: 'Top rated first' },
];

function SortingForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortingType = useAppSelector(getSortingType);
  const [isPlacesSortingOpened, setIsPlacesSortingOpened] = useState(false);
  const getSortingTypeLabel = () => SORTING_TYPES.find((type) => type.value === sortingType)?.label || null;

  return (
    <form className="places__sorting" action="/#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsPlacesSortingOpened(!isPlacesSortingOpened)}
        data-testid="sort-button"
      >
        <span>{getSortingTypeLabel()}</span>
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames('places__options places__options--custom', { 'places__options--opened': isPlacesSortingOpened })}
      >
        {
          SORTING_TYPES.map((type) => (
            <li
              key={type.value}
              className={classNames('places__option', { 'places__option--active': type.value === sortingType })}
              tabIndex={0}
              onClick={() => {
                dispatch(storeSortingType(type.value));
                setIsPlacesSortingOpened(!isPlacesSortingOpened);
              }}
            >
              {type.label}
            </li>
          ))
        }
      </ul>
    </form >
  );
}

export default memo(SortingForm);
