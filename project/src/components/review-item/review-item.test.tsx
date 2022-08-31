import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import ReviewItem from './review-item';
import { makeFakeReview } from '../../utils/mocks';

const fakeReview = makeFakeReview();

const history = createMemoryHistory();

describe('Component: PageHeader', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ReviewItem review={fakeReview} />
      </HistoryRouter>
    );

    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.')).toBeInTheDocument();
    expect(screen.getByText('August 2022')).toBeInTheDocument();
    expect(screen.getByText('Oliver.conner')).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
  });
});
