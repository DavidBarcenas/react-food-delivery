import {render} from '@testing-library/react';
import Spinner from '../spinner';

it('resize normal to large', () => {
  const {getByTestId, rerender} = render(<Spinner size='normal' />);
  const spinner = getByTestId('spinner');
  expect(spinner).toHaveClass('h-5 w-5');
  rerender(<Spinner size='large' />);
  expect(spinner).toHaveClass('h-8 w-8');
});
