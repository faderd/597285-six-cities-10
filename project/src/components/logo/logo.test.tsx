import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <Router>
        <Logo />
      </Router>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
