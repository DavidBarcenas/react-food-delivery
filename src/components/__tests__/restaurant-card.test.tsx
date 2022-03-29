import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import RestaurantCard from '../restaurant-card';

const fakeRestaurant = {
  id: 1,
  name: 'Fake Restaurant',
  categoryName: 'Fake Category',
  coverImage: 'https://fake.com/image.jpg',
};

it('should render correctly', () => {
  const {getByRole, getByText} = render(<RestaurantCard {...fakeRestaurant} />, {
    wrapper: BrowserRouter,
  });
  expect(getByRole('link')).toHaveAttribute('href', `/restaurant/${fakeRestaurant.id}`);
  expect(getByRole('img')).toHaveAttribute('src', `${fakeRestaurant.coverImage}`);
  expect(getByRole('heading')).toHaveTextContent(fakeRestaurant.name);
  expect(getByText(fakeRestaurant.categoryName)).toBeInTheDocument();
});

it('should navigate to restaurant detail', () => {
  const {getByRole} = render(<RestaurantCard {...fakeRestaurant} />, {
    wrapper: BrowserRouter,
  });
  getByRole('link').click();
  expect(window.location.pathname).toBe(`/restaurant/${fakeRestaurant.id}`);
});
