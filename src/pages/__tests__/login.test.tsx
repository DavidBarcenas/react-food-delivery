import {createMockClient} from 'mock-apollo-client';
import user from '@testing-library/user-event';
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

it('display email validation errors', async () => {
  const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
  const submitButton = screen.getByRole('button');
  await waitFor(() => {
    user.type(emailInput, 'invalid-email@wrong');
    user.click(submitButton);
  });
  let errorMessage = screen.getAllByRole('alert');
  expect(errorMessage[0]).toHaveTextContent(/ingresa un correo válido/i);
  await waitFor(() => {
    user.clear(emailInput);
    user.click(submitButton);
  });
  errorMessage = screen.getAllByRole('alert');
  expect(errorMessage[0]).toHaveTextContent(/el correo es requerido/i);
});

it('display password validation errors', async () => {
  const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
  const passwordInput = screen.getByPlaceholderText(/contraseña/i);
  const submitButton = screen.getByRole('button');

  await waitFor(() => {
    user.type(emailInput, 'test@mail.com');
    user.type(passwordInput, 'world');
    user.click(submitButton);
  });
  let errorMessage = screen.getByRole('alert');
  expect(errorMessage).toHaveTextContent(/la contraseña debe tener al menos 6 caracteres/i);
  await waitFor(() => {
    user.clear(passwordInput);
    user.click(submitButton);
  });
  errorMessage = screen.getByRole('alert');
  expect(errorMessage).toHaveTextContent(/la contraseña es requerida/i);
});
