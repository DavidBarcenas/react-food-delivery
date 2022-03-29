import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../button';

it('render button correctly', () => {
  render(<Button text='test' />);
});

it('change button sizes', () => {
  const {rerender} = render(<Button text='test' mode='full' />);
  expect(screen.getByText('test')).toHaveClass('w-full');
  rerender(<Button text='test' mode='normal' />);
  expect(screen.getByText('test')).not.toHaveClass('w-full');
});

it('should execute the function that receives as parameter', () => {
  const mockFn = jest.fn();
  render(<Button text='test' onClick={mockFn} />);
  userEvent.click(screen.getByText('test'));
  expect(mockFn).toHaveBeenCalledTimes(1);
});

it('show the spinner when loading is true', () => {
  render(<Button text='test' loading />);
  expect(screen.queryByText(/cargando.../i)).toBeInTheDocument();
});
