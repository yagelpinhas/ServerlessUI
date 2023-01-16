import React from 'react';
import { render, screen, queryByAttribute  } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Navbar', () => {
  const getById = queryByAttribute.bind(null, 'id');
  const dom = render(<App />);
  const navbar = getById(dom.container, 'navbar');
  expect(navbar).toBeInTheDocument();
  console.log(5)
});
