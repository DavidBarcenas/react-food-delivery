import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import RestaurantsGrid from '../restaurants-grid';

const fakeRestaurants = [
  {
    id: 1,
    name: 'Restaurant 1',
    coverImage: 'https://image/150',
    category: null,
    address: 'fake address',
    isPromoted: false,
  },
  {
    id: 2,
    name: 'Restaurant 2',
    coverImage: 'https://image/150',
    category: null,
    address: 'fake address',
    isPromoted: false,
  },
  {
    id: 3,
    name: 'Restaurant 3',
    coverImage: 'https://image/150',
    category: null,
    address: 'fake address',
    isPromoted: false,
  },
];

it('show the grid when there are restaurants', () => {
  const {getAllByRole} = render(<RestaurantsGrid restaurants={fakeRestaurants} />, {
    wrapper: BrowserRouter,
  });
  expect(document.getElementById('restaurants-grid')).toBeInTheDocument();
  expect(getAllByRole('link')).toHaveLength(3);
});

it('should return null when there are no restaurants', () => {
  const {container, queryAllByRole} = render(<RestaurantsGrid restaurants={[]} />, {
    wrapper: BrowserRouter,
  });
  expect(container.firstChild).toBeNull();
  expect(queryAllByRole('link')).toHaveLength(0);
});
