import {render} from '@testing-library/react';
import Logo from '../logo';

it('should resize the image', () => {
  const {getByRole, rerender} = render(<Logo />);
  expect(getByRole('img')).toHaveAttribute('width', '40');
  rerender(<Logo mode='vertical' />);
  expect(getByRole('img')).toHaveAttribute('width', '80');
});
