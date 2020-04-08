import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders click me! button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Click me!/i);
  expect(linkElement).toBeInTheDocument();
});
