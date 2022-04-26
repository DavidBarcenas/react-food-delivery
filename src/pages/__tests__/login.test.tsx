import user from '@testing-library/user-event';
import {createMockClient, MockApolloClient} from 'mock-apollo-client';
import {render, screen, waitFor} from '@testing-library/react';
import {ApolloProvider} from '@apollo/client';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import Login from '../login';
import {LOGIN_MUTATION} from '../../graphql/mutations';

let mockClient: MockApolloClient;

beforeEach(() => {
  mockClient = createMockClient();

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

it('displays email validation errors', async () => {
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

it('displays password validation errors', async () => {
  const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
  const passwordInput = screen.getByPlaceholderText(/contraseña/i);
  const submitButton = screen.getByRole('button');

  await waitFor(() => {
    user.type(emailInput, 'test@mail.com');
    user.type(passwordInput, '1234');
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

it('submit form and retrieve token', async () => {
  const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
  const passwordInput = screen.getByPlaceholderText(/contraseña/i);
  const submitButton = screen.getByRole('button');
  const formData = {
    email: 'fake@mail.com',
    password: '123456',
  };

  const mockMutationResponse = jest.fn().mockResolvedValue({
    data: {
      login: {
        ok: true,
        token: 'fake-token',
        error: null,
      },
    },
  });
  mockClient.setRequestHandler(LOGIN_MUTATION, mockMutationResponse);
  jest.spyOn(Storage.prototype, 'setItem');
  await waitFor(() => {
    user.type(emailInput, formData.email);
    user.type(passwordInput, formData.password);
    user.click(submitButton);
  });
  expect(mockMutationResponse).toHaveBeenCalledTimes(1);
  expect(mockMutationResponse).toHaveBeenCalledWith({
    loginInput: {
      email: formData.email,
      password: formData.password,
    },
  });
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('fd-token', 'fake-token');
});

it('renders an error message from the server', async () => {
  const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
  const passwordInput = screen.getByPlaceholderText(/contraseña/i);
  const submitButton = screen.getByRole('button');
  const formData = {
    email: 'fake@mail.com',
    password: '123456',
  };
  const mockMutationResponse = jest.fn().mockResolvedValue({
    data: {
      login: {
        ok: false,
        token: null,
        error: 'user not found',
      },
      loading: false,
    },
  });
  mockClient.setRequestHandler(LOGIN_MUTATION, mockMutationResponse);
  await waitFor(() => {
    user.type(emailInput, formData.email);
    user.type(passwordInput, formData.password);
    user.click(submitButton);
  });
  const errorMessage = await screen.findByRole('alert');
  expect(errorMessage).toHaveTextContent(/user not found/i);
});
