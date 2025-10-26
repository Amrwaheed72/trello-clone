import Home from './page';
import { render, screen } from '@testing-library/react';

test('render the main page', () => {
  render(<Home />);
  const linkElement = screen.getByTestId('Amr Waheed');
  expect(linkElement).toBeInTheDocument();
});
