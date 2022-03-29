import {render, waitFor} from '@testing-library/react';
import {isLoggedInVar} from './apollo';
import App from './app';

jest.mock('./routers/logged-out-router', () => {
  return {
    __esModule: true,
    default: () => <div>LoggedOutRouter</div>,
  };
});

jest.mock('./routers/logged-in-router', () => {
  return {
    __esModule: true,
    default: () => <div>LoggedInRouter</div>,
  };
});

it('render LoggedOutRouter when user is not authenticated', () => {
  const {getByText} = render(<App />);
  expect(getByText('LoggedOutRouter')).toBeInTheDocument();
});

it('render LoggedInRouter when user is authenticated', async () => {
  const {getByText} = render(<App />);
  await waitFor(() => isLoggedInVar(true));
  expect(getByText('LoggedInRouter')).toBeInTheDocument();
});
