import user from '@testing-library/user-event';
import {ApolloProvider} from '@apollo/client';
import {screen, waitFor} from '@testing-library/react';
import {createMockClient, MockApolloClient} from 'mock-apollo-client';
import {customRender} from '../../__fixtures__/utils';
import Signup from '../signup';
import {UserRole} from '../../types/globalTypes';
import {CREATE_ACCOUNT_MUTATION} from '../../graphql/mutations';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const realModule = jest.requireActual('react-router-dom');
  return {
    ...realModule,
    useNavigate: () => mockNavigate,
  };
});

let mockClient: MockApolloClient;

function getFields() {
  const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
  const passwordInput = screen.getByPlaceholderText('Contraseña');
  const confirmPasswordInput = screen.getByPlaceholderText('Confirmar contraseña');
  const submitButton = screen.getByRole('button');
  return {emailInput, passwordInput, confirmPasswordInput, submitButton};
}

beforeEach(() => {
  mockClient = createMockClient();
  customRender(
    <ApolloProvider client={mockClient}>
      <Signup />
    </ApolloProvider>,
  );
});

afterAll(() => jest.clearAllMocks());

it('render title correctly', async () => {
  expect(screen.getByText(/¡empecemos!/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText(/¡empecemos!/i)).toBeInTheDocument());
});

it('renders validation errors', async () => {
  const {emailInput, passwordInput, submitButton} = getFields();
  await waitFor(() => {
    user.click(submitButton);
  });
  const [requiredEmail, requiredPassword] = screen.getAllByRole('alert');
  expect(requiredEmail).toHaveTextContent(/el correo es requerido/i);
  expect(requiredPassword).toHaveTextContent(/la contraseña es requerida/i);
  await waitFor(() => {
    user.type(emailInput, 'test@google');
    user.type(passwordInput, '1234');
    user.click(submitButton);
  });
  const [invalidEmail, invalidPassword, invalidConfirmPassword] = screen.getAllByRole('alert');
  expect(invalidEmail).toHaveTextContent(/ingresa un correo válido/i);
  expect(invalidPassword).toHaveTextContent(/la contraseña debe tener al menos 6 caracteres/i);
  expect(invalidConfirmPassword).toHaveTextContent(/las contraseñas no coinciden/i);
});

it('create account', async () => {
  const {emailInput, passwordInput, confirmPasswordInput, submitButton} = getFields();
  const formData = {
    email: 'test@mail.com',
    password: '123456',
    confirmPassword: '123456',
    role: UserRole.Client,
  };
  const mockCreateAccountResponse = jest.fn().mockResolvedValue({
    data: {
      createAccount: {
        ok: true,
        error: 'test error',
      },
    },
  });
  mockClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, mockCreateAccountResponse);
  await waitFor(() => {
    user.type(emailInput, formData.email);
    user.type(passwordInput, formData.password);
    user.type(confirmPasswordInput, formData.password);
    user.click(submitButton);
  });
  expect(mockCreateAccountResponse).toHaveBeenCalledTimes(1);
  expect(mockCreateAccountResponse).toHaveBeenCalledWith({
    createAccountInput: {
      email: formData.email,
      password: formData.password,
      role: formData.role,
    },
  });
  // Testeamos el error aquí para no copiar todo este test
  // y solo setear el error. También, falta validar en el componente
  // que si OK es true no debe mostrarse el error.
  expect(screen.getByRole('alert')).toHaveTextContent('test error');
  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith('/');
});
