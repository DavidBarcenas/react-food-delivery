import {render} from '@testing-library/react';
import InputError from '../input-error';

const ERROR_MESSAGE = 'This is an error message';

it('render message correctly', () => {
  const {getByText} = render(<InputError message={ERROR_MESSAGE} />);
  expect(getByText(ERROR_MESSAGE)).toBeInTheDocument();
});

it('should show a block alert', () => {
  const {getByText, rerender} = render(<InputError message={ERROR_MESSAGE} />);
  expect(getByText(ERROR_MESSAGE)).not.toHaveClass('bg-danger-alert');
  rerender(<InputError message={ERROR_MESSAGE} filled />);
  expect(getByText(ERROR_MESSAGE)).toHaveClass('bg-danger-alert');
});
