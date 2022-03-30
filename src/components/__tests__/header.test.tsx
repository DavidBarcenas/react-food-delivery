import {render, waitFor, screen} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';
import {BrowserRouter} from 'react-router-dom';
import Header from '../header';
import {ME_QUERY} from '../../hooks/use-profile';

const mockProfile = (emailVerified = false) => ({
  request: {
    query: ME_QUERY,
  },
  result: {
    data: {
      me: {
        id: 1,
        email: 'test@mail.com',
        role: 'Client',
        emailVerified,
      },
    },
  },
});

const MESSAGE = 'Por favor verifica tu correo electrónico.';

it('show unverified account message', async () => {
  await waitFor(async () => {
    render(
      <MockedProvider mocks={[mockProfile()]}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </MockedProvider>,
    );

    await new Promise(resolve => setTimeout(resolve, 0));
  });
  expect(screen.getByText(MESSAGE)).toBeInTheDocument();
});

it('not show unverified account message', async () => {
  await waitFor(async () => {
    render(
      <MockedProvider mocks={[mockProfile(true)]}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </MockedProvider>,
    );
    await new Promise(resolve => setTimeout(resolve, 0));
  });
  expect(screen.queryByText(MESSAGE)).toBeNull();
});
