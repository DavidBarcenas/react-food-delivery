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

describe('<App />', () => {
  it('renders LoggedOutRouter', () => {
    const {getByText} = render(<App />);
    getByText('LoggedOutRouter');
  });

  it('renders LoggedInRouter', async () => {
    const {getByText} = render(<App />);
    await waitFor(() => isLoggedInVar(true));
    getByText('LoggedInRouter');
  });
});
