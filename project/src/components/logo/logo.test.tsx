import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Logo from './logo';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
