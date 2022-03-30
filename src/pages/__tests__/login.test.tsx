import {createMockClient} from 'mock-apollo-client';
import {render, screen, waitFor} from '@testing-library/react';
import {ApolloProvider} from '@apollo/client';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import Login from '../login';

beforeEach(() => {
  const mockClient = createMockClient();

  render(
    <BrowserRouter>
      <HelmetProvider>
        <ApolloProvider client={mockClient}>
          <Login />
        </ApolloProvider>
      </HelmetProvider>
    </BrowserRouter>,
  );
});

it('render correctly', async () => {
  expect(screen.getByText(/bienvenido de nuevo/i)).toBeInTheDocument();
  await waitFor(() => expect(document.title).toBe('Iniciar sesión | Food Delivery'));
});
