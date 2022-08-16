import { memo, useState } from 'react';
import { SortingType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { storeSortingType } from '../../store/app-data/app-data';
import { getSortingType } from '../../store/app-data/selectors';

function SortingForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortingType = useAppSelector(getSortingType);
  const sortingTypes = Array.from(Object.values(SortingType));
  const [isPlacesSortingOpened, setIsPlacesSortingOpened] = useState(false);

  return (
    <form className="places__sorting" action="/#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={sortingTypes.findIndex((type) => type === sortingType)}
        onClick={() => setIsPlacesSortingOpened(!isPlacesSortingOpened)}
      >
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isPlacesSortingOpened && 'places__options--opened'}`} onClick={({ target }: MouseEvent<HTMLUListElement>) => {
        dispatch(storeSortingType(sortingTypes[target.tabIndex]));
        setIsPlacesSortingOpened(!isPlacesSortingOpened);
      }}
      >
        {
          sortingTypes.map((type, index) => (
            <li key={`${index + 1}`} className={`places__option ${type === sortingType ? 'places__option--active' : ''}`} tabIndex={index}>{type}</li>
          ))
        }
      </ul>
    </form >
  );
}

export default memo(SortingForm);
