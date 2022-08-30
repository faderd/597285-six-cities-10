import {render, screen} from '@testing-library/react';
import Map from './map';
import {makeFakeOffers} from '../../utils/mocks';
import { LOCATIONS } from '../../const';

describe('Test Map component', () => {
  const offers = makeFakeOffers();
  it('Should render correctly', () => {
    render(
      <Map
        currentCity={LOCATIONS[0]}
        className={'cities__map'}
        offers={offers}
      />
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('map').classList.contains('leaflet-container')).toBeTruthy();
    expect(screen.getAllByRole('button').length).toBeTruthy();
  });
});
