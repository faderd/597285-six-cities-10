import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
