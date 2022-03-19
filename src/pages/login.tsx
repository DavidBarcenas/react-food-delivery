import {gql, useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import InputError from '../components/input-error';
import logo from '../assets/img/logo.png';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
      ok
      token
      error
    }
  }
`;

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const {register, handleSubmit, formState} = useForm<LoginForm>();
  const {email, password} = formState.errors;
  const [loginMutation] = useMutation(LOGIN_MUTATION);

  function onSubmit(data: LoginForm) {
    const {email, password} = data;
    loginMutation({variables: {email, password}});
  }

  return (
    <div className='flex h-screen items-center justify-center bg-gray-800'>
      <div className='w-full max-w-md rounded-lg bg-white py-20'>
        <div className='mb-8 text-center'>
          <img src={logo} alt='Food Delivery' width='80' className='inline-block' />
          <h1 className='mb-5 text-2xl text-gray-800'>Ingresa a Food Delivery</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-5 px-10'>
          <div>
            <input
              {...register('email', {required: 'El correo electrónico es requerido'})}
              name='email'
              type='email'
              required
              placeholder='Correo electrónico'
              className='input'
            />
            {email?.message && <InputError message={email?.message} />}
          </div>
          <div>
            <input
              {...register('password', {required: 'La contraseña es requerida', minLength: 6})}
              type='password'
              placeholder='Contraseña'
              required
              className='input'
            />
            {password?.message && <InputError message={password?.message} />}
            {password?.type === 'minLength' && (
              <InputError message='La contraseña debe tener al menos 6 caracteres' />
            )}
          </div>
          <button type='submit' className='btn'>
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
