import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app without crashing', () => {
  render(<App />);
  // Verify that the app renders with the menu heading
  const menuHeading = screen.getByText(/Our Menu/i);
  expect(menuHeading).toBeInTheDocument();
});
